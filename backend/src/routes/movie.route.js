// src/routes/movie.route.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const { requireAuth, requireAdmin } = require("../middlewares/auth.middleware");

// Public: xem phim
router.get("/", movieController.listMovies);
router.get("/:id", movieController.getMovie);

// Admin: CRUD
router.post("/", requireAuth, requireAdmin, movieController.createMovie);
router.put("/:id", requireAuth, requireAdmin, movieController.updateMovie);
router.delete("/:id", requireAuth, requireAdmin, movieController.deleteMovie);

module.exports = router;
