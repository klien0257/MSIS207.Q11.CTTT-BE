package com.cinema.backend.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class TmdbService {

    private final String API_KEY = "YOUR_TMDB_KEY"; // replace this!

    public JSONArray fetchPopularMovies() throws Exception {
        String url = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;

        try (InputStream is = new URL(url).openStream()) {
            String jsonText = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject json = new JSONObject(jsonText);
            return json.getJSONArray("results");
        }
    }
}
