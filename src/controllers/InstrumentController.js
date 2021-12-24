const InstrumentService = require("../services/InstrumentService");
const baseUrl = "http:localhost:5000/product/instrument/";

exports.addInstrument = async (req, res) => {
    try {
        const {category_id, manufacturer_id, instrument_name} = req.body;

        const image = req.file.originalname;

        const instrument = {
            category_id: category_id,
            manufacturer_id: manufacturer_id,
            instrument_name: instrument_name,
            image: baseUrl + image
        };

        const result = await InstrumentService.addInstrument(instrument);

        return res.status(200).json({msg: `Upload ${instrument_name} instrument successfully`, result});
    } catch (error) {
        return res.status(500).json(error);
    }
}
