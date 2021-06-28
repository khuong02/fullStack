const router = require("express").Router();
const pageController = require("../controller/page.controller");
const paginated = require("../middleware/paginated.middleware");
const model = require("../models/product.models");
const search = require("../middleware/search.middleware");

router.get("/background", pageController.backgroundImage);

router.get("/product", pageController.renderProduct);

router.get("/search", pageController.search);

router.get("/commerce", paginated(model.commerce), pageController.commerce);

module.exports = router;
