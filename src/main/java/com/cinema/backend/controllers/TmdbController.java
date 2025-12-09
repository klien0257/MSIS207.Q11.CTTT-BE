package com.cinema.backend.controllers;

import com.cinema.backend.service.MovieImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tmdb")
public class TmdbController {

    @Autowired
    private MovieImportService movieImportService;

    @GetMapping("/import")
    public String importMovies() throws Exception {
        movieImportService.importMovies();
        return "Movies imported successfully!";
    }
}
