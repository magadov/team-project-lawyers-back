const mongoose = require("mongoose")

const lawyerSchema = mongoose.Schema({

  login:{
    type: String,
  },
  password: {
    type: String
  },
  name:{
    type: String,
    required: true
  },
    surname: {
    type: String,
      required: true
    },
    patronymic: {
    type: String
  },
  services: [
   {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Service',
  }
  ],
  coeff: {
    type: Number
  }
  },
  {timestamps: true}
);

const Lawyer = mongoose.model('Lawyer', lawyerSchema)

module.exports = Lawyer;