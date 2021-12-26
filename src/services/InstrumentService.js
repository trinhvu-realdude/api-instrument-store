const db = require("../../models");
const Instrument = db.Instrument;
const Category = db.Category;
const Manufacturer = db.Manufacturer;

exports.addInstrument = (instrument) => Instrument.create(instrument);

exports.getAllInstrument = () => Instrument.findAll({
    attributes: [
        "id", "instrument_name", "image"
    ],
    include: [
        {
            model: Category,
            as: "category",
            attributes: ["category_name"]
        }, {
            model: Manufacturer,
            as: "manufacturer",
            attributes: ["manufacturer_name"]
        }
    ]
});
