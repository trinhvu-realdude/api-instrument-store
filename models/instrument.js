'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require("uuid")
module.exports = (sequelize, DataTypes) => {
    class Instrument extends Model { /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) { // define association here
            Instrument.belongsTo(models.Category, {
                as: "category",
                foreignKey: "category_id"
            });

            Instrument.belongsTo(models.Manufacturer, {
                as: "manufacturer",
                foreignKey: "manufacturer_id"
            });

            Instrument.hasMany(models.Item, {
                as: "item",
                foreignKey: "instrument_id"
            });
        }
    };
    Instrument.init({
        instrument_name: DataTypes.STRING,
        image: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        manufacturer_id: DataTypes.INTEGER
    }, {sequelize, modelName: 'Instrument'});
    return Instrument;
};
