using demo_backend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace demo_backend.Data
{
    public interface IUser
    {
        Task<String> Login(String username, String password);
        JsonResult Register(String username, String password);

        Users GetUserById(String id);
        Users GetUserByUsername(String username);
        void AddRole(string roleName);
        void GiveRoleToUser(String userId, String roleId);
        void AddPermission(String permissionName);
        void GivePermissonToUser(String userId, String permissionId);
        void AddRolePermission(String roleId, String permissionId);
        void AddGroup(String groupName);
        void AddUserGroup(String userId, String groupId);
        void AddGroupRole(String roleId, String groupId);
    }
}
