/**
    *Module dependencies. 
*/
const dbConfig = require('../../config/prod-db');
const Sequelize = require('sequelize');

/**
    *Database configuration. 
*/
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.DIALECT,
    timezone: dbConfig.TIMEZONE
})


/**
    *ModeL configuration. 
*/
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cart = require('./cart')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);
db.favorite = require('./favorite')(sequelize, Sequelize);
db.menu = require('./menu')(sequelize, Sequelize);
db.payment = require('./payment')(sequelize, Sequelize);
db.review = require('./review')(sequelize, Sequelize);
db.transactionItem = require('./transaction-item')(sequelize, Sequelize);
db.transaction = require('./transaction')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);

// db.role.hasMany(db.user)
// db.user.belongsTo(db.role)
/**
    *Model relation assignment. 
*/

/** Menu */
db.category.hasMany(db.menu)
db.menu.belongsTo(db.category)

/** Review */
db.menu.hasMany(db.review)
db.review.belongsTo(db.menu)
db.user.hasMany(db.review)
db.review.belongsTo(db.user)

/** Cart */
db.menu.hasMany(db.cart)
db.cart.belongsTo(db.menu)
db.user.hasMany(db.cart)
db.cart.belongsTo(db.user)

/** Favorite */
db.menu.hasMany(db.favorite)
db.favorite.belongsTo(db.menu)
db.user.hasMany(db.favorite)
db.favorite.belongsTo(db.user)

/** Transaction */
db.user.hasMany(db.transaction)
db.transaction.belongsTo(db.user)
db.payment.hasMany(db.transaction)
db.transaction.belongsTo(db.payment)

/** Transaction Item*/
db.menu.hasMany(db.transactionItem)
db.transactionItem.belongsTo(db.menu)
db.transaction.hasMany(db.transactionItem)
db.transactionItem.belongsTo(db.transaction)

module.exports = db;