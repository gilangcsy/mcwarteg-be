const controller = require('../controllers/transaction.controller');
const API = require('../../config/dev-db');

module.exports = app => {

	let router = require('express').Router();
	
	router.post('/', controller.create);

	app.use(`${API.VERSION}/transaction/`, router);
}