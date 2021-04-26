using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class GroupRoles
    {
        [Key]
        public String RoleId { get; set; }
        public Roles Role { get; set; }
        [Key]
        public String GroupId { get; set; }
        public Groups Group { get; set; }
    }
}
