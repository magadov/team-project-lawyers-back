const Lawyer = require('../models/Lawyer.model');
const bcrypt = require('bcrypt')
const { token } = require("morgan");
const jwt = require('jsonwebtoken')
const { hash } = require("bcrypt");

module.exports.lawyersController = {
  addLawyers: async(req, res) => {
    const {name, surname, login, password, img} = req.body
    try {
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

      const lawyer = await Lawyer.create({
        name,
        surname,
        login,
        password: hash,
        img,
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
    try {
      console.log(req.body);
      await Lawyer.findByIdAndUpdate(req.user.id, {
        $set: { ...req.body },
      });
      const user = await Lawyer.findById(req.user.id);
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
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
  },
  updateImg: async (req, res) => {
    try {
      await Lawyer.findByIdAndUpdate(req.user.id, {
        img: req.file.path,
      });
      res.status(200).json(req.file.path);
    } catch (e) {
      res.json(e);
    }
  },
  getOneLawyer: async (req, res) => {
    try {
      const id = req.user.id;
      const lawyer = await Lawyer.findById(id);
      res.json(lawyer);
    } catch (e) {
      console.log(e.message);
    }
  },
  addServiceInSummary: async (req, res) => {
    try {
      const law = await Lawyer.findByIdAndUpdate(req.user.id, {
        $push: { serv: req.body }
      }, { new: true })
       res.status(200).json(law)
    } catch (e) {
       res.json(e.message)
    }
  },
  deleteServInSummary: async (req, res) => {
    try{
      await Lawyer.findByIdAndUpdate(req.user.id, {
        $pull: {serv: {_id: req.params.id}}
      })
      res.status(200).json("Услуга успешно удалена")
    }catch (e) {
      res.json(e.message)
    }
  }
}