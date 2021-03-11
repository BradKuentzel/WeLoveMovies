const knex = require("../db/connection");

const read = (knex, reviewId) =>
  knex("reviews").select().where({ review_id: reviewId }).first();

const updateReviewById = (knex, reviewId, review) =>
  knex("reviews").select().where({ review_id: reviewId }).update(review, "*");

const getCriticById = (knex, criticId) =>
  knex("critics").select().where({ critic_id: criticId }).first();

const deleteReviewById = (knex, reviewId) =>
  knex("reviews").where({ review_id: reviewId }).delete();

module.exports = {
  read,
  updateReviewById,
  deleteReviewById,
  getCriticById,
};
