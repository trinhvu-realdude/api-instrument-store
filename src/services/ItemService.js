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
        "image",
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

exports.getItemByInstrument = (instrument_name) => Item.findAll({
    attributes: [
        "id",
        "item_name",
        "description",
        "price",
        "discount",
        "image",
        "availability",
        "link_demo",
    ],
    include: [
        {
            model: Instrument,
            as: "instrument",
            attributes: ["instrument_name"],
            where: {
                instrument_name: instrument_name
            },
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

exports.deleteItemById = (item_id) => Item.destroy({
    where: {
        id: item_id
    }
});
