using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Recommended
    {
        [StringLength(450)]
        public String Id { get; set; }
        
        public String MovieId { get; set; }
        public Movies Movie { get; set; }
    }
}
