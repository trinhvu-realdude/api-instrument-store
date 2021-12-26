'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Item extends Model { /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) { // define association here
            Item.belongsTo(models.Instrument, {
                as: "instrument",
                foreignKey: "instrument_id"
            });
        }
    };
    Item.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4()
        },
        item_name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        discount: DataTypes.DECIMAL,
        image: DataTypes.STRING,
        availability: DataTypes.STRING,
        link_demo: DataTypes.STRING,
        instrument_id: DataTypes.INTEGER
    }, {sequelize, modelName: 'Item'});
    return Item;
};
