const ItemService = require("../services/ItemService");
const baseUrl = process.env.BASE_URL_ITEM;

exports.addItem = async (req, res) => {
    try {
        const {
            item_name,
            description,
            price,
            discount,
            availability,
            link_demo,
            instrument_id
        } = req.body;

        const image = req.file.originalname;

        const item = {
            item_name: item_name,
            description: description,
            price: price,
            discount: discount,
            image: baseUrl + image,
            availability: availability,
            link_demo: link_demo,
            instrument_id: instrument_id
        };

        const result = await ItemService.addItem(item);

        return res.status(200).json({msg: `Upload ${item_name} successfully`, result});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllItem = async (req, res) => {
    try {
        const result = await ItemService.getAllItem();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getItemByInstrument = async (req, res) => {
    try {
        const instrument_name = req.query.name.replace("%", " ");

        const result = await ItemService.getItemByInstrument(instrument_name);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
