const db = require("../../models");
const Item = db.Item;
const Instrument = db.Instrument;
const Manufacturer = db.Manufacturer;
const Category = db.Category;

exports.addItem = (item) => Item.create(item);

exports.getAllItem = () => Item.findAll({
    attributes: [
        "id",
        "item_name",
        "description",
        "price",
        "discount",
        "availability",
        "link_demo",
    ],
    include: [
        {
            model: Instrument,
            as: "instrument",
            attributes: ["instrument_name"],
            include: [
                {
                    model: Manufacturer,
                    as: "manufacturer",
                    attributes: ["manufacturer_name", "country"]
                }, {
                    model: Category,
                    as: "category",
                    attributes: ["category_name"]
                }
            ]
        }
    ]
});
