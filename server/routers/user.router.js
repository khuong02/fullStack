const router = require("express").Router();

const userController = require("../controller/user.controller");
const verify = require("./verifyToken");
const upload = require("../middleware/upload");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/profile", verify, userController.profile);

router.patch("/changePassword/:id", userController.changePassword);

router.post(
  "/upload_avatar",
  upload.single("avatar"),
  userController.upload_avatar
);

router.post(
  "/upload_product",
  upload.single("image"),
  userController.upload_product
);

router.post("/upload", userController.upload);

router.post("/product", userController.product);

router.post("/delete", userController.userDeleteProduct);

router.post("/edit", userController.edit);

router.patch("/edit/:id", userController.changeProduct);

module.exports = router;
