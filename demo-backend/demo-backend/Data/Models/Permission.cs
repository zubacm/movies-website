using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Permission
    {
        [StringLength(450)]
        public String Id { get; set; }
        [StringLength(100)]
        public String Name { get; set; }
    }
}
