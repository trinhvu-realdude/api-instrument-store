'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model { /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) { // define association here
            User.belongsTo(models.Role, {foreignKey: "roleId"})
        }
    };
    User.init({
        userName: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        province: DataTypes.STRING,
        image: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        refreshToken: DataTypes.STRING
    }, {sequelize, modelName: 'User'});
    return User;
};
