const service = require("./theaters.service");
const treeize = require("../utils/treeize");

async function list(req, res, next) {
  const knexInstance = req.app.get("db");
  let data = await service.list(knexInstance);
  data = treeize(data);
  res.json({ data });
}

module.exports = {
  list: [list],
};
