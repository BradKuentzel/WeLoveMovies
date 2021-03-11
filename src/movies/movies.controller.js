const service = require("./movies.service");
const treeize = require("../utils/treeize");

async function movieExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = `Movie cannot be found.`;
  const { movieId } = req.params;
  if (!movieId) {
    return res.status(404).json({ error });
  }
  let movie = await service.getMovieById(movieId);

  if (!movie) {
    return res.status(404).json({ error });
  }
  res.locals.movie = movie;
  next();
}

async function list(req, res, next) {
  if (req.query.is_showing === "true") {
    await activeMovies(req, res, next);
  } else {
    const knexInstance = req.app.get("db");
    const data = await service.getAllMovies(knexInstance);
    res.json({ data });
  }
}

async function activeMovies(req, res, next) {
  const knexInstance = req.app.get("db");
  const data = await service.getMoviesShowing(knexInstance);
  res.json({ data });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function getTheaters(req, res) {
  const knex = req.app.get("db");
  const { movieId } = req.params;
  const theaters = await service.listTheatersById(knex, movieId);
  res.json({ data: theaters });
}

async function movieReviews(req, res, next) {
  const knexInstance = req.app.get("db");
  let data = await service.getMovieReviews(req.params.movieId, knexInstance);
  data = treeize(data);
  res.json({ data });
}

module.exports = {
  list: [list],
  activeMovies: [activeMovies],
  read: [movieExists, read],
  getTheaters: [movieExists, getTheaters],
  movieReviews: [movieExists, movieReviews],
};
