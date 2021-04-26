using demo_backend.Data;
using demo_backend.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Services
{
    public class MovieService : IMovies
    {
        private readonly ApplicationDbContext _context;
        public MovieService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void AddComment(Comments comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
        }

        public void AddGenre(Genres genre)
        {
            _context.Genres.Add(genre);
            _context.SaveChanges();
        }

        public void AddMovie(Movies movie, List<Genres> genres)
        {
            var movieId = AddMovie(movie);
            AddMovieGenre(movieId, genres.Select(g => g.Id).ToList());
        }

        public String AddMovie(Movies movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();
            return movie.Id;
        }

        public void AddMovieGenre(String movieId, List<String> genresId)
        {
            List<MovieGenre> movieGenre = genresId.Select(g => new MovieGenre() { GenreId = g, MovieId = movieId}).ToList();
            _context.MovieGenres.AddRange(movieGenre);
            _context.SaveChanges();
        }

        public void AddRecommendedMovie(string movieId)
        {
            var recommended = new Recommended()
            {
                MovieId = movieId
            };

            _context.Recommended.Add(recommended);
            _context.SaveChanges();
        }

        public void DeleteComment(string commentId)
        {
            var comment = new Comments() { Id = commentId };

            _context.Comments.Remove(comment);
            _context.SaveChanges();
        }

        public void DeleteGenre(string genreId)
        {
            var genre = new Genres() { Id = genreId }; // vidi oce li brisat i moviegenre
            _context.Genres.Remove(genre);
            _context.SaveChanges();
        }

        public void DeleteMovie(string movieId)
        {
            var movie = new Movies() { Id = movieId }; // vidi oce li brisat i moviegenre
            _context.Movies.Remove(movie);
            _context.SaveChanges();
        }

        public List<Genres> GetAllGenres()
        {
            return _context.Genres.ToList();
        }

        public Movies GetMovie(string movieid)
        {
            return _context.Movies
                .Include(m => m.Comments)
                .Where(m => m.Id == movieid)
                .FirstOrDefault();
        }

        public List<Movies> GetMovies(int page, int pageSize)
        {
            return _context.Movies
                //.Include(m => m.Comments)
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public List<Movies> GetMoviesByGenre(int page, int pageSize, String genreId)
        {
            return _context.Movies
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .Where(m => m.MovieGenres.Select(mg => mg.GenreId).Contains(genreId))
                .Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public List<Movies> SearchMovies(int page, int pageSize, String search)
        {
            return _context.Movies
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .Where(m => m.Title.ToLower().Contains(search.ToLower()) || m.Title2.ToLower().Contains(search.ToLower()))
                .Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        public void RemoveRecommendedMovie(string movieId)
        {
            var recommended = _context.Recommended
                .Where(m => m.MovieId == movieId).FirstOrDefault();// vidi hoce li brisat i moviegenre
            _context.Recommended.Remove(recommended);
            _context.SaveChanges();
        }

        public void UpdateGenre(Genres genre)
        {
            var updGgen = _context.Genres.SingleOrDefault(g => g.Id == genre.Id);
            if(updGgen != null)
            {
                updGgen.Name = genre.Name;
                _context.SaveChanges();
            }
        }

        public void UpdateMovie(Movies movie)
        {
            var updMovie = _context.Movies.SingleOrDefault(m => m.Id == movie.Id);
            if (updMovie != null)
            {
                updMovie.BackgroundImage = movie.BackgroundImage;
                updMovie.Director = movie.Director;
                updMovie.Image = movie.Image;
                updMovie.Pg = movie.Pg;
                updMovie.Published = movie.Published;
                updMovie.RunningTime = movie.RunningTime;
                updMovie.Synopsis = movie.Synopsis;
                updMovie.Title = movie.Title;
                updMovie.Title2 = movie.Title2;
                updMovie.TrailerUrl = movie.TrailerUrl;
                _context.SaveChanges();
            }
        }
    }
}
