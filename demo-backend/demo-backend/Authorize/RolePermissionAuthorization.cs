using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace demo_backend.Authorize
{
    public class RolePermissionAuthorization : AuthorizeAttribute, IAuthorizationFilter
    {
        public String Permissions;
        public String Role;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //Validate if any permissions are passed when using attribute at controller or action level
            if (string.IsNullOrEmpty(Permissions) || string.IsNullOrEmpty(Role))
            {
                //Validation cannot take place without any permissions so returning unauthorized
                context.Result = new UnauthorizedResult();
                return;
            }

            var claims = context.HttpContext.User.Claims;

            var userName = claims.Where(claim => claim.Type == "Name").FirstOrDefault();

            //var userRoles = claims
            //    .Where(claim => claim.Type == ClaimTypes.Role)
            //    .ToList();
            var userRoles = claims
                .Where(claim => claim.Type == "Role")
                .ToList();

            var assignedRolesForUser = userRoles.Select(r => r.Value);
            var requiredRoles = Role.Split(","); //Multiple permissiosn can be received from controller, delimiter "," is used to get individual values


            var rolePermissions = claims
                            .Where(claim => claim.Type == "RolePermission")
                            .ToList();



            var requiredPermissions = Permissions.Split(","); //Multiple permissiosn can be received from controller, delimiter "," is used to get individual values

            foreach (var x in requiredRoles)
            {
                if (assignedRolesForUser.Contains(x))
                {
                    foreach (var rp in rolePermissions)
                    {
                        var rolePer = rp.Value.Split(",");
                        var role = rolePer[0];
                        if(x == role)
                        {
                            var permission = rolePer[1].Trim();
                            if(requiredPermissions.Contains(permission))
                            {
                                return;
                            }
                        }
                    }
                    
                }
            }


            context.Result = new UnauthorizedResult();
            return;

        }
    }
}
