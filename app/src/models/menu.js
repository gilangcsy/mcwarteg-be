module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define('Menu', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        discount: {
            type: Sequelize.STRING
        },
        discountDescription: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        urlPhoto: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        photoName: {
            type: Sequelize.TEXT
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.STRING
        },
        deletedAt: {
            type: "TIMESTAMP"
        },
        deletedBy: {
            type: Sequelize.STRING
        },
        updatedAt: {
            type: "TIMESTAMP"
        },
        updatedBy: {
            type: Sequelize.STRING
        },
    }, {
        tableName: 'Menu'
    })
    return Menu;
}