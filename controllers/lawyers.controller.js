const Lawyer = require('../models/Lawyer.model');
const bcrypt = require('bcrypt')
const { token } = require("morgan");
const jwt = require('jsonwebtoken')
const { hash } = require("bcrypt");

module.exports.lawyersController = {
  addLawyers: async(req, res) => {
    const {name, surname, login, password} = req.body
    try {
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

      const lawyer = await Lawyer.create({
        name,
        surname,
        login,
        password: hash
      });
      res.json(lawyer)
    }catch (e) {
      return res.status(400).json({
      error: "Ошибка при регистрации: " + e.toString()
      })
    }
  },

  getLawyers: async (req, res) => {
    try {
      const lawyers = await Lawyer.find();
      res.json(lawyers)
    }catch (e) {
      res.json(e.message)
    }
  },
  getLawyerByServices: async(req, res) => {
    try {
      const lawyer = await Lawyer.find({services: req.params.id})
      res.json(lawyer)
    }catch (e) {
      res.json(e.message)
    }
  },
  editLawyers: async (req, res) => {
      const {name, surname, patronymic, category} = req.body;
    try{
      await Lawyer.findByIdAndUpdate(
        req.params.id,
        {
          name,
          surname,
          patronymic,
          category
        },
        {new: true},
      )
      res.json('Описание успешно изменено')
    }catch (e) {
      res.json(e.message)
    }
  },
  deleteLawyers: async(req, res) => {
    try{
      await Lawyer.findByIdAndDelete(req.params.id)
      res.json('Юрист успешно удалён')
    }catch (e) {
      res.json(e.message)
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    try{
      const candidate = await Lawyer.findOne({ login });
      if(!candidate){
        return res.status(401).json('Неверный логин');
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if(!valid){
        return res.status(401).json("Неверный пароль")
      }
      const payload = {
        id: candidate._id,
        login: candidate.login
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: '24d'
      })

      res.json({
        token
      })
    }
    catch (e) {
      res.json(e.message)
    }


  }
}