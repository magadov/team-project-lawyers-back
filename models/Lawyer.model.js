const mongoose = require("mongoose");
const { text } = require("express");

const lawyerSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    patronymic: {
      type: String,
    },
    img: {
      type: String,
      default: null,
    },
    services: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Service",
      },
    ],

    serv: [
      {
        text: String,
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    coeff: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

module.exports = Lawyer;
