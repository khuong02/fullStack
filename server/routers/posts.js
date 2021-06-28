const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/user.model");

router.get("/", verify, (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    return res.json({ ...req.user, name: user.name, avatar: user.avatar });
  });
});

module.exports = router;
