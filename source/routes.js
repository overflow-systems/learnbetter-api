const express = require('express');
const routes = express.Router();
const MentorController = require('./controller/MentorController');

routes.get('/mentores', MentorController.index);

module.exports = routes;
