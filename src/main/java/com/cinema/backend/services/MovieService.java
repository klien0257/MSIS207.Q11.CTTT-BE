package com.cinema.service;

import com.cinema.model.Movie;
import com.cinema.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    // Get all movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Get movie by ID
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    // Add a new movie
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Update an existing movie
    public Movie updateMovie(Long id, Movie movieDetails) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            Movie updatedMovie = movie.get();
            updatedMovie.setTitle(movieDetails.getTitle());
            updatedMovie.setDescription(movieDetails.getDescription());
            updatedMovie.setGenre(movieDetails.getGenre());
            updatedMovie.setReleaseDate(movieDetails.getReleaseDate());
            updatedMovie.setRating(movieDetails.getRating());
            return movieRepository.save(updatedMovie);
        }
        return null;
    }

    // Delete a movie
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
