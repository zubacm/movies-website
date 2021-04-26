using demo_backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Authorize
{
    public class CustomAuthorization : AuthorizeAttribute, IAuthorizationFilter
    {
        public string Permissions { get; set; } //Permission string to get from controller


        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //Validate if any permissions are passed when using attribute at controller or action level
            if (string.IsNullOrEmpty(Permissions))
            {
                //Validation cannot take place without any permissions so returning unauthorized
                context.Result = new UnauthorizedResult();
                return;
            }
            
            var userName = context.HttpContext.User.Identity.Name;
            var userPermissions = context.HttpContext.User.Claims
                .Where(claim => claim.Type == "Permission")
                .ToList();
            
            var assignedPermissionsForUser = userPermissions.Select(p => p.Value);


            var requiredPermissions = Permissions.Split(","); //Multiple permissiosn can be received from controller, delimiter "," is used to get individual values
            foreach (var x in requiredPermissions)
            {
                if (assignedPermissionsForUser.Contains(x))
                    return; //User Authorized. Wihtout setting any result value and just returning is sufficent for authorizing user
            }

            context.Result = new UnauthorizedResult();
            return;
        }
    }
}
