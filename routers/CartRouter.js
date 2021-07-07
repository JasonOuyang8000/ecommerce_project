const cartController = require('../controllers/CartController');

const cartRouter = require('express').Router();


cartRouter.get('/',cartController.getCart);
cartRouter.put('/:id',cartController.updateCart);
cartRouter.get('/items',cartController.getCartItems);


module.exports = cartRouter;
