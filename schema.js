// schema.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Review Schema
 */
const ReviewSchema = new Schema({
  reviewerName: {
    type: String,
    required: [true, "Reviewer name is required"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
});

/**
 * Product Schema
 */
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["electronics", "fashion", "home", "books"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1 INR"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  releaseDate: {
    type: Date,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

/**
 * Compile Models
 */
const Product = mongoose.model("Product", ProductSchema);
const Review = mongoose.model("Review", ReviewSchema);

/**
 * Export Models
 */
module.exports = { Product, Review };
