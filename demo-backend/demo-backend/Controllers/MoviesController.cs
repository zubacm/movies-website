using demo_backend.Authorize;
using demo_backend.Data;
using demo_backend.Data.Models;
using demo_backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Controllers
{
    [Route("api/movies")]
    public class MoviesController : Controller
    {
        private readonly IMovies _movies;
        public MoviesController(IMovies movies)
        {
            _movies = movies;
        }
        public IActionResult Index()
        {
            return View();
        }



        [HttpGet]
        [Route("get-movies")]
        public IActionResult GetMovies([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] String genreId, [FromQuery] String search)
        {
            try
            {
                List<Movies> moviesList;
                if(string.IsNullOrWhiteSpace(search))
                { 
                    if(string.IsNullOrWhiteSpace(genreId))
                    {
                        moviesList = _movies.GetMovies(page, pageSize);
                    }
                    else
                    {
                        moviesList = _movies.GetMoviesByGenre(page, pageSize, genreId);
                    }
                }
                else
                {
                    moviesList = _movies.SearchMovies(page, pageSize, search);
                }
                return new JsonResult(new { StatusCodeResult = "200", movies = moviesList });
            }
            catch (Exception)
            {
                return new JsonResult(new { StatusCodeResult = "500", message = "Server error" });
            }
        }

        [HttpGet]
        [Route("get-genres")]
        public IActionResult GetGenres()
        {
            var genresList = _movies.GetAllGenres();
            return Json(genresList);
        }

        [HttpPost] 
        [Route("add-genre")]
        public IActionResult AddGenre([FromBody] Genres genre)
        {
            try
            {
                _movies.AddGenre(genre);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("add-movie")]
        public IActionResult AddMovie([FromBody] MovieModel model)
        {
            try
            {
                var movie = new Movies()
                {
                    BackgroundImage = model.BackgroundImage,
                    Director = model.Director,
                    Image = model.Image,
                    Pg = model.Pg,
                    Published = model.Published,
                    RunningTime = model.RunningTime,
                    Synopsis = model.Synopsis,
                    Title = model.Title,
                    Title2 = model.Title2,
                    TrailerUrl = model.TrailerUrl,
                    DateTimeAdded = DateTime.Now
                };

                _movies.AddMovie(movie, model.Genres);
                return new JsonResult(new { StatusCodeResult = "200", message = "Movie has been successfully added" });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { StatusCodeResult = "500", message = ex.Message });
            }
            
        }

        [HttpPost]
        [Route("delete-movie")]
        [RolePermissionAuthorization(Role = "rola")]
        public IActionResult DeleteMovie([FromQuery] String id)
        {
            try
            {
                _movies.DeleteMovie(id);
                return new JsonResult(new { StatusCodeResult = "200", message = "Movie has been successfully deleted" });
            }
            catch (Exception)
            {
                return new JsonResult(new { StatusCodeResult = "500", message = "Server error" });
            }
        }
    }
}
