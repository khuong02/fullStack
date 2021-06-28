const models = require("../models/product.models");

const pageController = {
  backgroundImage: async (req, res) => {
    try {
      const background = await models.background.find().then((background) => {
        return background;
      });

      if (background.length === 0 || !background)
        return res.status(400).json({ msg: "Not background in database." });

      return res.json({ background });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  renderProduct: async (req, res) => {
    try {
      const products = await models.product.find().then((product) => {
        return product;
      });

      if (products.length === 0 || !products)
        return res.status(400).json({ msg: "Not product in database." });

      return res.json({ products });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  search: async (req, res) => {
    try {
      const { name } = req.query;
      if (!name)
        return res
          .status(400)
          .json({ msg: "Enter the product you are looking for." });

      const products = await models.commerce.find().then((product) => {
        return product.filter((item) => {
          return item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
        });
      });

      if (products.length === 0)
        return res.status(400).json({ msg: "Not found product." });

      res.json({ products });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  commerce: async (req, res) => {
    try {
      return res.json(res.paginatedResults);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = pageController;
