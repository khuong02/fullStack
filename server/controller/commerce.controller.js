const model = require("../models/product.models");
const paginated = require("../middleware/paginated.middleware");

const CommerceController = {
  item1: async (req, res) => {
    try {
      return res.json(res.paginatedResults);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = CommerceController;
