const InstrumentService = require("../services/InstrumentService");
const baseUrl = process.env.BASE_URL_INSTRUMENT;

exports.addInstrument = async (req, res) => {
    try {
        const {instrument_name, category_id, manufacturer_id} = req.body;

        const image = req.file.originalname;

        const instrument = {
            instrument_name: instrument_name,
            image: baseUrl + image,
            category_id: category_id,
            manufacturer_id: manufacturer_id
        };

        const result = await InstrumentService.addInstrument(instrument);

        return res.status(200).json({msg: `Upload ${instrument_name} instrument successfully`, result});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllInstrument = async (req, res) => {
    try {
        const result = await InstrumentService.getAllInstrument();

        return res.status(200).json(result.length == 0 ? {msg: "List is empty"} : result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getInstrumentByCategory = async (req, res) => {
    try {
        const category_name = req.query.name.replace("%", " ");

        const result = await InstrumentService.getInstrumentByCategory(category_name);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
