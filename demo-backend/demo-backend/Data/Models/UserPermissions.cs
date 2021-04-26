using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class UserPermissions
    {
        [Key]
        public String UserId { get; set; }
        public Users User { get; set; }
        [Key]
        public String PermissionId { get; set; }
        public Permission Permission { get; set; }
    }
}
