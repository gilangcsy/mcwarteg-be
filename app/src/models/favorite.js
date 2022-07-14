module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define('Favorite', {
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    }, {
        tableName: 'Favorite',
        updatedAt: false, // don't add updatedAt attribute
    })
    return Favorite;
}