const { Op } = require('sequelize');
const models = require('../models');

const cartController = {}

// try {

// }
// catch(error) {
//     if (error.message) {
//         return res.status(400).json({
//             error: error.message
//         })
//     }
//     return res.status(400).json({
//         error
//     })
// }
cartController.getCart = async (req,res) => {
    try {
        const cartItems = await req.userFind.getCarts({
            where: {
                quantity: {[Op.gt]:0},
            },
            include: {
                model: models.item,
                include: {
                    model: models.item_image,
                    as: 'images'
                }
            }
        })

        return res.json({
            cartItems
        });
    }
    catch(error) {
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    }
};


cartController.updateCart = async(req,res) => {
    try {
        let [cartItem, createdCartItem ] = await models.cart.findOrCreate({
            where: {
                userId: req.userFind.id,
                itemId: req.params.id,
            },
            defaults: {
                quantity: req.body.quantity
            },
        
            include: {
                model: models.item,
                include: {
                    model: models.item_image,
                    as: 'images'
                }
            }
         
            
        });
        
        if (createdCartItem) {
       
    

            return res.json({
                cartItem: createdCartItem,
            });
        }

        else {
        
           cartItem.quantity = req.body.quantity

           await cartItem.save();

           return res.json({
               cartItem
           });
        }




    }
    catch(error) {
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    }
}


cartController.getCartItems = async (req,res) => {
    try {
        let { items } = req.query;

    
        
        items = items.map(item => JSON.parse(item));

        const itemIds = items.map(item => parseInt(Object.keys(item)[0]));
        
        console.log(itemIds)
 
        
        const allItems = await models.item.findAll({
            where: {
                id: {
                    [Op.in] : itemIds
                }
            },
            include: {
                model: models.item_image,
                as: 'images'
            }
        })


    
        
        res.json({
            items: allItems
        });

    }

    catch(error) {
        console.log(error);
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    }
}


module.exports = cartController;