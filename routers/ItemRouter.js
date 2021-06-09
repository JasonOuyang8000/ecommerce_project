const itemController = require('../controllers/ItemController');

const itemRouter = require('express').Router();

itemRouter.get('/', itemController.getAll);

module.exports = itemRouter;