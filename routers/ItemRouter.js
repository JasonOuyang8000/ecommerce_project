const itemController = require('../controllers/ItemController');

const itemRouter = require('express').Router();

itemRouter.get('/', itemController.getAll);
itemRouter.get('/rand',itemController.getRandItems);

module.exports = itemRouter;