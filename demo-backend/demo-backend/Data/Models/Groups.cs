using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Groups
    {

        [StringLength(450)]
        public String Id { get; set; }
        [StringLength(150)]
        public String Name { get; set; }
        public List<UserGroup> UserGroups { get; set; }

        [NotMapped]
        public List<Roles> Roles { get; set; }
    }
}
