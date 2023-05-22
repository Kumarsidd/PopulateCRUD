import mongoose from "mongoose";

const product = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    attributes: {
      type: String,
    },
    price: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    images: {
      type: [String],
    },
    tax: {
      type: Number,
      default: 0.05,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.model("Product", product);

export default productSchema;
