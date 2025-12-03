// src/models/movie.model.js
const { getPool } = require("../config/db");

// Lấy tất cả phim
async function getAllMovies() {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Movies");
  return result.recordset;
}

// Lấy phim theo Id
async function getMovieById(id) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("Id", id)
    .query("SELECT * FROM Movies WHERE Id = @Id");
  return result.recordset[0];
}

// Tạo phim mới
async function createMovie(data) {
  const {
    title,
    description,
    durationMinutes,
    releaseDate,
    ageRating,
    posterUrl,
    trailerUrl,
  } = data;

  const pool = await getPool();
  const result = await pool
    .request()
    .input("Title", title)
    .input("Description", description || null)
    .input("DurationMinutes", durationMinutes)
    .input("ReleaseDate", releaseDate || null)
    .input("AgeRating", ageRating || null)
    .input("PosterUrl", posterUrl || null)
    .input("TrailerUrl", trailerUrl || null)
    .query(`
      INSERT INTO Movies 
        (Title, Description, DurationMinutes, ReleaseDate, AgeRating, PosterUrl, TrailerUrl)
      OUTPUT INSERTED.*
      VALUES (@Title, @Description, @DurationMinutes, @ReleaseDate, @AgeRating, @PosterUrl, @TrailerUrl)
    `);

  return result.recordset[0];
}

// Cập nhật phim
async function updateMovie(id, data) {
  const {
    title,
    description,
    durationMinutes,
    releaseDate,
    ageRating,
    posterUrl,
    trailerUrl,
  } = data;

  const pool = await getPool();
  const result = await pool
    .request()
    .input("Id", id)
    .input("Title", title)
    .input("Description", description || null)
    .input("DurationMinutes", durationMinutes)
    .input("ReleaseDate", releaseDate || null)
    .input("AgeRating", ageRating || null)
    .input("PosterUrl", posterUrl || null)
    .input("TrailerUrl", trailerUrl || null)
    .query(`
      UPDATE Movies
      SET 
        Title = @Title,
        Description = @Description,
        DurationMinutes = @DurationMinutes,
        ReleaseDate = @ReleaseDate,
        AgeRating = @AgeRating,
        PosterUrl = @PosterUrl,
        TrailerUrl = @TrailerUrl
      OUTPUT INSERTED.*
      WHERE Id = @Id
    `);

  return result.recordset[0];
}

// Xoá phim
async function deleteMovie(id) {
  const pool = await getPool();
  await pool
    .request()
    .input("Id", id)
    .query("DELETE FROM Movies WHERE Id = @Id");
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
