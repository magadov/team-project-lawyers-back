const mongoose = require("mongoose");
const { model } = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    categories: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Lawyer",
    }
  },
  { timestamps: true }
);

const Service = model("Service", serviceSchema);

module.exports = Service;
