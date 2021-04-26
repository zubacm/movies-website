using demo_backend.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Models
{
    public class MovieModel
    {
        public String Id { get; set; }
        public String Title { get; set; }
        public String Title2 { get; set; }
        public String Synopsis { get; set; }
        public String Pg { get; set; }
        public String Director { get; set; }
        public String Published { get; set; }
        public String RunningTime { get; set; }
        public String Image { get; set; }
        public String BackgroundImage { get; set; }
        public String TrailerUrl { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public List<Genres> Genres { get; set; }


        //public ICollection<Comments> Comments { get; set; }
        //public ICollection<Genres> Genres { get; set; }
        //public ICollection<Actors> Actors { get; set; }
        //public ICollection<Writers> Writers { get; set; }
        //public String UserId { get; set; }
        //public Users User { get; set; }
    }
}
