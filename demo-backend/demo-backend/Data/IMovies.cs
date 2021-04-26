using demo_backend.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_backend.Data
{
    public interface IMovies
    {
        public void AddMovie(Movies movie, List<Genres> genres);
        String AddMovie(Movies movie);
        void AddGenre(Genres genre);
        void AddComment(Comments comment);
        void AddRecommendedMovie(String movieId);
        void UpdateMovie(Movies movie);
        void UpdateGenre(Genres genre);
        void RemoveRecommendedMovie(String movieId);
        List<Movies> GetMovies(int page, int pageSize);
        List<Movies> GetMoviesByGenre(int page, int pageSize, String genreId);
        List<Movies> SearchMovies(int page, int pageSize, String search);
        Movies GetMovie(String movieid);
        void DeleteMovie(String movieId);
        void DeleteGenre(String genreId);
        void DeleteComment(String commentId);
        List<Genres> GetAllGenres();
        
    }
}
