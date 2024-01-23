const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Order", orderSchema);
