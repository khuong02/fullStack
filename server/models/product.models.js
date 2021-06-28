const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Introduce Product",
  },
  name: {
    type: String,
    required: [true],
  },
  price: {
    type: String,
    required: [true],
  },
  params: {
    type: String,
    default: "Product information is being updated!",
  },
  image: {
    type: String,
    required: [true],
  },
  size: {
    type: String,
    default: "XS",
  },
  selectQuality: {
    type: String,
    default: "Basic",
  },
  color: {
    type: String,
    default: "white",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  cloudinary: {
    type: String,
    required: true,
  },
});

const BackgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "background",
  },
  image: {
    type: String,
    default: "http://bhhome.vn/images/website/001.jpg",
  },
});

const CommerceSchema = new mongoose.Schema({
  species: {
    type: String,
    required: [true],
  },
  image: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  cloudinary: {
    type: String,
    required: true,
  },
});

const background = (module.exports = mongoose.model(
  "Background",
  BackgroundSchema,
  "background"
));

const product = (module.exports = mongoose.model(
  "Products",
  ProductSchema,
  "products"
));

const commerce = (module.exports = mongoose.model(
  "Commerce",
  CommerceSchema,
  "commerce"
));

const item1 = (module.exports = mongoose
  .model("item1", CommerceSchema, "commerce")
  .find({ species: "phaochi" }));

const item2 = (module.exports = mongoose
  .model("item2", CommerceSchema, "commerce")
  .find({ species: "chinhua" }));

const item3 = (module.exports = mongoose
  .model("item3", CommerceSchema, "commerce")
  .find({ species: "chigoc" }));

const item4 = (module.exports = mongoose
  .model("item4", CommerceSchema, "commerce")
  .find({ species: "chitran" }));

const item5 = (module.exports = mongoose
  .model("item5", CommerceSchema, "commerce")
  .find({ species: "chitrangtri" }));

const item6 = (module.exports = mongoose
  .model("item6", CommerceSchema, "commerce")
  .find({ species: "chichan" }));

const item7 = (module.exports = mongoose
  .model("item7", CommerceSchema, "commerce")
  .find({ species: "chikhungtranh" }));

const item8 = (module.exports = mongoose
  .model("item8", CommerceSchema, "commerce")
  .find({ species: "chivien" }));

const item9 = (module.exports = mongoose
  .model("item9", CommerceSchema, "commerce")
  .find({ species: "tamoptuong" }));

const item10 = (module.exports = mongoose
  .model("item10", CommerceSchema, "commerce")
  .find({ species: "thanhlam" }));

const item11 = (module.exports = mongoose
  .model("item11", CommerceSchema, "commerce")
  .find({ species: "lamri" }));

const item12 = (module.exports = mongoose
  .model("item12", CommerceSchema, "commerce")
  .find({ species: "tamop" }));

const item13 = (module.exports = mongoose
  .model("item13", CommerceSchema, "commerce")
  .find({ species: "vanlotsan" }));

const item14 = (module.exports = mongoose
  .model("item14", CommerceSchema, "commerce")
  .find({ species: "cuanhua" }));

module.exports = {
  background,
  product,
  commerce,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12,
  item13,
  item14,
};
