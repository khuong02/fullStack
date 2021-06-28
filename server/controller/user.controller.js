const User = require("../models/user.model");
const ProductUser = require("../models/productUser");
const models = require("../models/product.models");
const {
  registerValidation,
  loginValidation,
  resetValidation,
  uploadProductValidation,
  uploadValidation,
  updateValidation,
} = require("../validation/user.validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

const Users = {
  register: async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).json({ msg: error.details[0].message });

    //Checking if user is already in the database
    const emailExits = await User.findOne({ email: req.body.email });

    if (emailExits)
      return res.status(400).json({ msg: "Email already exists." });

    if (req.body.password !== req.body.rf_password)
      return res.status(400).json({ msg: "Rf_password is not correct." });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    try {
      const saveUser = await user.save();

      res.json({ user_id: user._id });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ msg: error.details[0].message });

    //Checking if email exists.
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ msg: "Email does not already exists." });

    //Checking if password is correct.
    const checkingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkingPassword)
      return res.status(400).json({ msg: "Password is not correct" });

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header("auth-token", token).json({ accessToken: token });

    // res.json({ msg: "Login success!" });
  },
  logout: async (req, res) => {
    try {
      delete req.headers["auth-token"];

      res.json({ msg: "Logout success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  profile: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user._id });
      if (!user) return res.status(400).json({ msg: "Not found user." });

      res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { error } = resetValidation(req.body);

      const { password, rf_password } = req.body;

      if (error) return res.status(400).json({ msg: error.details[0].message });

      const { id } = req.params;

      const options = { returnNewDocument: false };
      if (!id) return res.status(400).json({ msg: "Not found user." });

      if (password !== rf_password)
        return res.status(400).json({ msg: "Passwords are not the same." });

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await User.findOneAndUpdate(
        { _id: id },
        { password: hashPassword },
        options
      );
      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  upload_avatar: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) return res.status(400).json({ msg: "Not found user." });

      if (!req.file) return res.status(400).json({ msg: "Not file already." });

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "web-sales",
        width: 150,
        height: 150,
        crop: "fill",
      });

      const uploadAvatar = { avatar: result.url };
      const options = { returnNewDocument: false };

      await User.findOneAndUpdate({ email: email }, uploadAvatar, options);

      res.json({ msg: "Change avatar success!", url: result.url });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  upload_product: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ msg: "Not file already." });

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "web-sales/product",
        width: 234,
        height: 150,
        crop: "fill",
      });
      res.json({ image: result.url, cloudinary_id: result.public_id });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  upload: async (req, res) => {
    try {
      const { species, nameProduct, id, imageProduct, cloudinary } = req.body;
      const { error } = uploadValidation(req.body);

      if (error) return res.status(400).json({ msg: error.details[0].message });

      //   res.send(resultImage.url);

      const doc = {
        species: species,
        name: nameProduct,
        image: imageProduct,
        cloudinary: cloudinary,
      };

      const result = await new models.commerce(doc).save();

      if (!result)
        return res.status(400).json({ msg: "Id product does not already." });

      const idInsert = { idUser: id, idProduct: result._id };

      await new ProductUser(idInsert).save();

      res.json({ msg: "Upload product success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  product: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) return res.status(400).json({ msg: "User does not already." });

      const productUser = await ProductUser.find({ idUser: id });

      if (!productUser)
        return res
          .status(400)
          .json({ msg: "Product of user does not already." });

      const product = productUser.map((item) => {
        return item.idProduct;
      });

      const productInPage = await models.commerce.find({
        _id: product.map((item) => item),
      });

      res.json({ productInPage });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  userDeleteProduct: async (req, res) => {
    try {
      const { idUser, idProduct, cloudinary_id } = req.body;

      if (!idUser || !idProduct)
        return res.status(400).json({ msg: "Not found product." });

      const deleteProduct = await ProductUser.find({
        idUser: idUser,
        idProduct: idProduct,
      });

      if (!deleteProduct)
        return res.status(400).json({ msg: "Product does not already." });

      await models.commerce.deleteOne({
        _id: deleteProduct[0].idProduct,
      });

      if (cloudinary_id) {
        await cloudinary.uploader.destroy(cloudinary_id);
      }

      await ProductUser.deleteOne({
        idUser: req.body.idUser,
        idProduct: req.body.idProduct,
      });

      res.json({ msg: "Delete success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json("Error post request.");

      const product = await models.commerce.find({ _id: id });

      //   if (!product) res.status(400).json({ msg: "Sản phẩm không tồn tại!" });

      res.json({ product });
    } catch (err) {
      res.status(500).json({ msg: "Sản phẩm không tồn tại!" });
    }
  },
  changeProduct: async (req, res) => {
    try {
      const { nameProduct, species, image, cloudinaryNew, oldCloudinary } =
        req.body;
      const { error } = updateValidation(req.body);

      if (error) return res.status(400).json({ msg: error.details[0].message });

      const options = { returnNewDocument: false };

      const { id } = req.params;
      if (!id) return res.status(400).json("Error post request.");

      const update = {
        species: species,
        name: nameProduct,
        image: image,
        cloudinary: cloudinaryNew ? cloudinaryNew : oldCloudinary,
      };

      if (cloudinaryNew !== oldCloudinary) {
        await cloudinary.uploader.destroy(oldCloudinary);
      }

      await models.commerce.findOneAndUpdate({ _id: id }, update, options);
      res.json({ msg: "Update success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = Users;
