'use strict';
const {v4: uuidv4} = require("uuid");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4()
            },
            instrument_id: {
                type: Sequelize.INTEGER
            },
            item_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DECIMAL
            },
            discount: {
                type: Sequelize.DECIMAL
            },
            image: {
                type: Sequelize.STRING
            },
            avaibility: {
                type: Sequelize.STRING
            },
            link_demo: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Items');
    }
};
