using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Comments
    {
        [StringLength(450)]
        public String Id { get; set; }
        public int Rating { get; set; }
        [StringLength(600)]
        public String Comment { get; set; }

        public String UserId { get; set; }
        public Users User { get; set; }
        public int MovieId { get; set; }
        public Movies Object { get; set; }
    }
}
