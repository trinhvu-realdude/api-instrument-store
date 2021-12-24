const db = require("../../models");
const Instrument = db.Instrument;

exports.addInstrument = (instrument) => Instrument.create(instrument);
