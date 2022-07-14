module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('Cart', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.STRING
        },
        updatedAt: {
            type: "TIMESTAMP"
        },
        updatedBy: {
            type: Sequelize.STRING
        },
    }, {
        tableName: 'Cart'
    })
    return Cart;
}