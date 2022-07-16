'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
    class User extends Model { /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) { // define association here
            User.belongsTo(models.Role, {
                as: "role",
                foreignKey: "role_id"
            });
        }
    };
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4()
        },
        user_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        province: DataTypes.STRING,
        image: DataTypes.STRING,
        role_id: DataTypes.INTEGER
    }, {sequelize, modelName: 'User'});
    return User;
};
