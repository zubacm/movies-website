using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class UserRoles
    {
        [Key]
        public String UserId { get; set; }
        public Users User { get; set; }
        [Key]
        public String RoleId { get; set; }
        public Roles Role { get; set; }
    }
}
