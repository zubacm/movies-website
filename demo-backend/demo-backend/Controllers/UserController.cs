using demo_backend.Authorize;
using demo_backend.Data;
using demo_backend.Data.Models;
using demo_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace demo_backend.Controllers
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly IUser _user;
        public UserController(IUser user)
        {
            _user = user;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult RegisterUser([FromBody] UserModel userModel)
        {
            try
            {
                var result = _user.Register(userModel.Username, userModel.Password);
                return result;
            }
            catch (Exception ex)
            {
                return new JsonResult(new { StatusCodeResult = "500", message = ex.Message });
            }
           


        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] UserModel userModel)
        {
            try
            {
                var token = _user.Login(userModel.Username, userModel.Password);
                if (token.Result == null)
                {
                    return BadRequest("Wrong username or password");
                }

                return Ok(new { token = token.Result });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { StatusCodeResult = "500", message = ex.Message });
            }

        }

        //logout samo na klijentu

        [HttpPost]
        [Route("add-role")]
        [Authorize]
        public IActionResult AddRole([FromBody] RoleModel role)
        {
            _user.AddRole(role.Name);
            return Ok();
        }

        [HttpPost]
        [Route("add-user-role")]
        public IActionResult AddRoleToUser([FromBody] UserRoleModel model)
        {
            _user.GiveRoleToUser(model.UserId, model.RoleId);

            return Ok();
        }

        [HttpPost]
        [Route("add-permission")]
        [Authorize]
        public IActionResult AddPermission([FromBody] PermissionModel permission)
        {
            _user.AddPermission(permission.Name);
            return Ok();
        }

        [HttpPost]
        [Route("add-user-permission")]
        public IActionResult AddPermissionToUser([FromBody] UserPermissionModel model)
        {
            _user.GivePermissonToUser(model.UserId, model.PermissionId);

            return Ok();
        }

        [HttpPost]
        [Route("add-role-permission")]
        [Authorize]
        public IActionResult AddRolePermission([FromBody] RolePermissionModel model)
        {
            _user.AddRolePermission(model.RoleId, model.PermissionId);
            return Ok();
        }

        [HttpPost]
        [Route("add-group")]
        public IActionResult AddGroup([FromBody] GroupModel model)
        {
            _user.AddGroup(model.Name);

            return Ok();
        }

        [HttpPost]
        [Route("add-user-group")]
        [Authorize]
        public IActionResult AddUserGroup([FromBody] UserGroupModel model)
        {
            _user.AddUserGroup(model.UserId, model.GroupId);
            return Ok();
        }

        [HttpPost]
        [Route("add-group-role")]
        [Authorize]
        public IActionResult AddGroupRole([FromBody] GroupRoleModel model)
        {
            _user.AddGroupRole(model.RoleId, model.GroupId);
            return Ok();
        }



        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "Id")
                .FirstOrDefault();
            
            return Ok(ok);
        }

        [HttpGet]
        [Route("test2")]
        [Authorize(Roles="rola")]
        public IActionResult Test2()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "Id")
                .FirstOrDefault();

            return Ok(ok);
        }

        [HttpGet]
        [Route("test12")]
        [Authorize]
        public IActionResult Test12()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "Id")
                .FirstOrDefault();

            return Ok(ok);
        }

        [HttpGet]
        [Route("test3")]
        [Authorize(Roles ="role")]
        [CustomAuthorization(Permissions="canRead, canWrite")] //nezavisne autorizacije 
        public IActionResult Test3()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "Permission")
                .FirstOrDefault();

            return Ok(ok);
        }

        [HttpGet]
        [Route("test44")]
        [Authorize]//sa Role = "role" ima samo svoje permisije
        public IActionResult Test44()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "RolePermission")
                .FirstOrDefault();

            return Ok(ok);
        }

        [HttpGet]
        [Route("test4")]
        [RolePermissionAuthorization(Role = "rola", Permissions = "canRead")]//sa Role = "role" ima samo svoje permisije
        public IActionResult Test4()
        {
            var ok = this.User.Claims
                .Where(claim => claim.Type == "RolePermission")
                .FirstOrDefault();

            return Ok(ok);
        }


        
    }
}
