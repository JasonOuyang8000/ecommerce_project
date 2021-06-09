const cartController = require('../controllers/CartController');

const cartRouter = require('express').Router();


cartRouter.get('/',cartController.getCart);
cartRouter.put('/:id',cartController.updateCart);



module.exports = cartRouter;
