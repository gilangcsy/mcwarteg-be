const controller = require('../controllers/menu.controller');
const API = require('../../config/dev-db');

module.exports = app => {

	let router = require('express').Router();
	
	router.get('/', controller.read);
	router.post('/', controller.create);

	app.use(`${API.VERSION}/menu/`, router);
}