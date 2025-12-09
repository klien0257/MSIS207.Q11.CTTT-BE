package com.cinema.backend.service;

import com.cinema.backend.models.Movie;
import com.cinema.backend.repositories.MovieRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieImportService {

    @Autowired
    private TmdbService tmdbService;

    @Autowired
    private MovieRepository movieRepository;

    public void importMovies() throws Exception {
        JSONArray movies = tmdbService.fetchPopularMovies();

        for (int i = 0; i < movies.length(); i++) {
            JSONObject m = movies.getJSONObject(i);

            Long tmdbId = m.getLong("id");

            // Avoid duplicates
            if (movieRepository.findByTmdbId(tmdbId).isPresent()) {
                continue;
            }

            Movie movie = new Movie();
            movie.setTmdbId(tmdbId);
            movie.setTitle(m.getString("title"));
            movie.setOverview(m.getString("overview"));
            movie.setPosterPath(m.getString("poster_path"));
            movie.setReleaseDate(m.getString("release_date"));
            movie.setRating(m.getDouble("vote_average"));

            movieRepository.save(movie);
        }
    }
}
