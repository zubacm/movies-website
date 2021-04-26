using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data.Models
{
    public class Movies
    {
        [StringLength(450)]
        public String Id { get; set; }
        [StringLength(100)]
        public String Title { get; set; }
        [StringLength(256)]
        public String Title2 { get; set; }
        [StringLength(500)]
        public String Synopsis { get; set; }
        [StringLength(50)]
        public String Pg { get; set; }
        [StringLength(100)]
        public String Director { get; set; }
        [StringLength(100)]
        public String Published { get; set; }
        [StringLength(30)]
        public String RunningTime { get; set; }
        public String Image { get; set; }
        public String BackgroundImage { get; set; }
        public String TrailerUrl { get; set; }
        public DateTime DateTimeAdded { get; set; }


        public ICollection<Comments> Comments { get; set; }
        public List<MovieGenre> MovieGenres { get; set; }
        public String UserId { get; set; }
        public Users User { get; set; }
    }
}
