const db = require("../../models");
const Category = db.Category;

exports.addCategory = (category) => Category.create(category);

exports.getCategory = () => Category.findAll({
    attributes: ["id", "category_name", "image"]
});
