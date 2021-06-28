const router = require("express").Router();

const model = require("../models/product.models");
const CommerceController = require("../controller/commerce.controller");
const paginated = require("../middleware/paginated.middleware");

router.get("/phao-chi", paginated(model.item1), CommerceController.item1);

router.get("/chi-lung", paginated(model.item2), CommerceController.item1);

router.get("/chi-goc", paginated(model.item3), CommerceController.item1);

router.get("/chi-tran", paginated(model.item4), CommerceController.item1);

router.get("/chi-trang-tri", paginated(model.item5), CommerceController.item1);

router.get("/chi-chan", paginated(model.item6), CommerceController.item1);

router.get(
  "/chi-khung-tranh",
  paginated(model.item7),
  CommerceController.item1
);

router.get("/chi-vien", paginated(model.item8), CommerceController.item1);

router.get("/tam-op-tuong", paginated(model.item9), CommerceController.item1);

router.get("/thanh-lam", paginated(model.item10), CommerceController.item1);

router.get("/lamri", paginated(model.item11), CommerceController.item1);

router.get("/tam-op-3d", paginated(model.item12), CommerceController.item1);

router.get("/van-lot-san", paginated(model.item13), CommerceController.item1);

router.get("/cua-nhua", paginated(model.item14), CommerceController.item1);

module.exports = router;
