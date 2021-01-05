const Sequelize = require('sequelize');
const sequelize = require("./sequelize.js");

const TodosTable = sequelize.define("todos_table", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING(255)
    },
    finish: {
        type: Sequelize.BOOLEAN
    },
    c_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = TodosTable