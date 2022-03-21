const Service = require("../models/Service.model");
const jwt = require("jsonwebtoken");

module.exports.servicesController = {
  addServices: async (req, res) => {
    const { name, price, categories } = req.body;
    const { id } = req.user;

    try {
      const service = await Service.create({
        name,
        price,
        userId: id,
        categories,
      });
      res.json(service);
    } catch (e) {
      res.json(e.message);
    }
  },
  getServices: async (req, res) => {
    try {
      const service = await Service.find();
      res.json(service);
    } catch (e) {
      res.json(e.message);
    }
  },
  getServicesByCategories: async (req, res) => {
    try {
      const services = Service.find({ categories: req.params.id });
      res.json(services);
    } catch (e) {
      res.json(e.message);
    }
  },
  editServices: async (req, res) => {
    const { name, price, category } = req.body;
    try {
      await Service.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          category,
        },
        { new: true }
      );
      res.json("Услуга успешно изменена");
    } catch (e) {
      res.json(e.message);
    }
  },
  deleteServices: async (req, res) => {
    const {id} = req.params;
    try {
      const service = await Service.findById(id);

      if (service.userId.toString() === req.user.id) {
        await service.remove();

        return res.json("Услуга удалена");
      }
      return res.status(401).json("Ошибка. Нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка: " + e.toString());
    }
  }
};
