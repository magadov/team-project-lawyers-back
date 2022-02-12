const Category = require("../models/Category.model");

module.exports.categoriesController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.find();

      return res.json(categories);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getCategoryById: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);

      return res.json(category);
    } catch (e) {
      return res.json(e.message);
    }
  },
  createCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });

      return res.json(category);
    } catch (e) {
      return res.json(e.message);
    }
  },
  removeCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Category.findByIdAndRemove(id);

      return res.json(deleted);
    } catch (e) {
      return res.json(e.message);
    }
  },
  editCategory: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
      const edited = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      return res.json(edited);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
