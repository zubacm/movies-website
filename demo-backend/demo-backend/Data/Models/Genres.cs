using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Genres
    {
        [StringLength(450)]
        public String Id { get; set; }
        [StringLength(150)]
        public String Name { get; set; }

        public List<MovieGenre> MovieGenres { get; set; } 
    }
}
