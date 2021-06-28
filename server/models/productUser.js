const mongoose = require("mongoose");

const productUserSchema = mongoose.Schema({
  idUser: {
    type: String,
    required: true,
  },
  idProduct: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "ProductUser",
  productUserSchema,
  "productUser"
);
