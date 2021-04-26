using demo_backend.Data;
using demo_backend.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace demo_backend.Services
{
    public class UsersService : IUser
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IToken _token;

        public UsersService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IToken token)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _token = token;
        }

        public Users GetUserById(string id)
        {
            throw new NotImplementedException();
        }

        public Users GetUserByUsername(string username)
        {
            var user = _context.Users
                .Include(u => u.UserRoles)
                .Include(u => u.UserPermissions)
                .Include(u => u.UserGroups)
                .Where(u => u.Username == username)
               .FirstOrDefault();

            if (user == null) return null;

            user.Roles =  GetUserRoles(user.UserRoles.Select(ur => ur.RoleId).ToList());
            var groupRoles = GetGroupRoles(user.UserGroups.Select(ug => ug.GroupId).ToList());
            user.Roles.AddRange(groupRoles.Where(gr => !user.Roles.Contains(gr)));
            user.Permissions = GetUserPermissions(user.UserPermissions.Select(up => up.PermissionId).ToList());

            user.RolePermissions = GetRolePermissions(user.UserRoles.Select(ur => ur.RoleId).ToList());
            return user;
        }

        private List<Roles> GetUserRoles(List<String> RolesIds)
        {
            return _context.Roles
                .Where(role => RolesIds.Contains(role.Id))
                .ToList();

        }

        private List<Roles> GetGroupRoles(List<String> GroupsIds)
        {
            var groupRoleList = _context.GroupRoles
                .Include(gr => gr.Role)
                .Where(gr => GroupsIds.Contains(gr.GroupId));

            return groupRoleList.Select(x => x.Role).ToList();

        }

        private List<Permission> GetUserPermissions(List<String> PermissionsIds)
        {
            return _context.Permissions
                 .Where(p => PermissionsIds.Contains(p.Id))
                 .ToList();
        }

        private List<RolePermissions> GetRolePermissions(List<String> RolesIds)
        {
            return _context.RolePermissions
                .Include(rp => rp.Role)
                .Include(rp => rp.Permission)
                 .Where(rp => RolesIds.Contains(rp.RoleId))
                 .ToList();
        }

        public JsonResult Register(string username, string password)
        {
            if(_context.Users.Where(u => u.Username == username).FirstOrDefault() != null)
            {
                return new JsonResult(new { StatusCodeResult = "400",message = "Username is already taken" });
            }
            var user = new Users()
            {
                Username = username,
                Password = BCrypt.Net.BCrypt.HashPassword(password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return new JsonResult(new { StatusCodeResult = "200", message = "You have successfully registered in" });

        }

        public async Task<String> Login(string username, string password)
        {
            // Find and validate the user:
            Users user = GetUserByUsername(username);
            if (user == null || (!BCrypt.Net.BCrypt.Verify(password, user.Password)))
            {
                //TODO: zamijenit response kodom
                return null;
            }

            // Create the identity
            var identity = new ClaimsIdentity(JwtBearerDefaults.AuthenticationScheme);
            var claims = new List<Claim>();
            identity.AddClaim(new Claim("Name", user.Username));
            identity.AddClaim(new Claim("Id", user.Id));


            //Add roles
            if (user.Roles != null)
            {
                foreach (var role in user.Roles.Select(u => u.Name))
                {
                    identity.AddClaim(new Claim("Role", role));
                    //claims.Add(new Claim("Role", role));
                }
            }

            //Add permissions -- samo za permisije, nezavisno od rola, nezavisna autorizacija
            if (user.Permissions != null)
            {
                foreach (var permission in user.Permissions.Select(u => u.Name))
                {
                    identity.AddClaim(new Claim("Permission", permission));
                }
            }

            //Add role-permissions-- ovo je za role povezane sa permisijama
            if (user.RolePermissions != null)
            {
                foreach (var rolePermission in user.RolePermissions.ToList())
                {
                   identity.AddClaim(new Claim("RolePermission", rolePermission.Role.Name+","+rolePermission.Permission.Name));       
                }
            }
          
            var token =_token.GenerateAccessToken(identity.Claims);

            return token;
        }

        public void AddRole(string roleName)
        {
            var role = new Roles()
            {
                Name = roleName
            };
            _context.Roles.Add(role);
            _context.SaveChanges();
        }

        public void AddPermission(String permisssionName)
        {
            var permission = new Permission()
            {
                Name = permisssionName
            };
            _context.Permissions.Add(permission);
            _context.SaveChanges();
        }
        public void GivePermissonToUser(String userId, String permissionId)
        {
            var userPermission = new UserPermissions()
            {
                UserId = userId,
                PermissionId = permissionId
            };

            _context.UserPermissions.Add(userPermission);
            _context.SaveChanges();
        }
        public void GiveRoleToUser(String userId, String roleId)
        {
            var userRole = new UserRoles()
            {
                UserId = userId,
                RoleId = roleId
            };

            _context.UserRoles.Add(userRole);
            _context.SaveChanges();
        }

        public void AddRolePermission(String roleId, String permissionId)
        {
            var rolePermission = new RolePermissions()
            {
                RoleId = roleId,
                PermissionId = permissionId
            };
            _context.RolePermissions.Add(rolePermission);
            _context.SaveChanges();
        }

        public void AddGroup(String groupName)
        {
            var group = new Groups()
            {
                Name = groupName
            };
            _context.Groups.Add(group);
            _context.SaveChanges();
        }
        public void AddUserGroup(String userId, String groupId)
        {
            var userGroup = new UserGroup()
            {
                UserId = userId,
                GroupId = groupId
            };
            _context.UserGroups.Add(userGroup);
            _context.SaveChanges();
        }
        public void AddGroupRole(String roleId, String groupId)
        {
            var groupRole = new GroupRoles()
            {
                RoleId = roleId,
                GroupId = groupId
            };
            _context.GroupRoles.Add(groupRole);
            _context.SaveChanges();
        }

    }
}
