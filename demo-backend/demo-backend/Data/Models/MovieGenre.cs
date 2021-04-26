using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class MovieGenre
    {
        [Key]
        public String MovieId { get; set; }
        public Movies Movie { get; set; }
        [Key]
        public String GenreId { get; set; }
        public Genres Genre { get; set; }

    }
}
