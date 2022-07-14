const controller = require('../controllers/cart.controller');
const API = require('../../config/dev-db');

module.exports = app => {

	let router = require('express').Router();
	
	router.get('/read-by-user/:id', controller.readCartByUserId);
	router.post('/', controller.addToCart);
	router.patch('/:id', controller.updateQuantity)
	router.delete('/:id', controller.delete)

	app.use(`${API.VERSION}/cart/`, router);
}