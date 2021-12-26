const db = require("../../models");
const Category = db.Category;
const Instrument = db.Instrument;
const Manufacturer = db.Manufacturer;

exports.addCategory = (category) => Category.create(category);

exports.getAllCategory = () => Category.findAll({
    attributes: [
        "id", "category_name", "image"
    ],
    include: [
        {
            model: Instrument,
            as: "instrument",
            attributes: [
                "instrument_name", "image"
            ],
            include: [
                {
                    model: Manufacturer,
                    as: "manufacturer",
                    attributes: ["manufacturer_name", "country"]
                }
            ]
        }
    ]
});