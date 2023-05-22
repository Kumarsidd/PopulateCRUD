import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";

// defining express and dotenv
const app = express();
dotenv.config();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello",
  });
});

// routes
app.use("/v1/cats", categoryRoute);
app.use("/v1/products", productRoute);

// server
const PORT = process.env.PORT || 5000;
try {
  connectDB();
  app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`);
  });
} catch (error) {
  console.log("failed to start the server");
}
