import mongoose from "mongoose";

const category = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = mongoose.model("Category", category);

export default categorySchema;
