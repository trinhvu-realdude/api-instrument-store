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
    const result = await InstrumentService.getAllInstrument();

    return res.status(200).json(result);
}
