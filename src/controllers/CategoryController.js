const CategoryService = require("../services/CategoryService");
const baseUrl = "http:localhost:5000/product/category/";

exports.addCategory = async (req, res) => {
    try {
        const category_name = req.body.category_name;
        const image = req.file.originalname;

        const category = {
            category_name: category_name,
            image: baseUrl + image
        };

        const result = await CategoryService.addCategory(category);

        return res.status(200).send({msg: `Upload the ${image} successfully`, result});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getAllCategory = async (req, res) => {
    const result = await CategoryService.getCategory();

    return res.send(result);
}
