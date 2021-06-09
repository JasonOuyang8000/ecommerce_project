const cartController = require('../controllers/CartController');

const cartRouter = require('express').Router();


cartRouter.get('/',cartController.getCart);




module.exports = cartRouter;
