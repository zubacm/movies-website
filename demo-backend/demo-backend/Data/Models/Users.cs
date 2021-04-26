using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Users
    {

        [StringLength(450)]
        public String Id { get; set; }
        [StringLength(20)]
        public String Username { get; set; }
        [StringLength(300)]
        public String Password { get; set; }

        public List<UserRoles> UserRoles { get; set; }

        [NotMapped]
        public List<Roles> Roles { get; set; }
        public List<UserPermissions> UserPermissions { get; set; }

        [NotMapped]
        public List<Permission> Permissions { get; set; }
        public List<RolePermissions> RolePermissions { get; set; }

        [NotMapped]
        public List<Groups> Groups { get; set; }
        public List<UserGroup> UserGroups { get; set; }
    }
}
