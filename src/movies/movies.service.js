const knex = require("../db/connection");

const movieReviewCriticJoin = knex("movies as m")
  .distinct()
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id");

const getAllMovies = () => knex("movies").select("*");

const getMoviesShowing = () =>
  knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });

const getMovieById = (movieId) =>
  knex("movies").select("*").where({ movie_id: movieId }).first();

const getMovieReviews = (movieId) =>
  movieReviewCriticJoin
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic-:critic_id",
      "c.preferred_name as critic-:preferred_name",
      "c.surname as critic-:surname",
      "c.organization_name as critic-:organization_name"
    )
    .where({ "r.movie_id": movieId });

const listTheatersById = (knex, movieId) =>
  knex("theaters as t")
    .select()
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.is_showing": true })
    .andWhere({ "mt.movie_id": movieId });

module.exports = {
  getAllMovies,
  getMoviesShowing,
  getMovieById,
  getMovieReviews,
  listTheatersById,
};
