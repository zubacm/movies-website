using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class RolePermissions
    {
        [Key]
        public String RoleId { get; set; }
        public Roles Role { get; set; }
        [Key]
        public String PermissionId { get; set; }
        public Permission Permission { get; set; }
    }
}
