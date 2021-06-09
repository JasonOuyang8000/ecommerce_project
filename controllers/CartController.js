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
           console.log('test');

            return res.json({
                cartItem: createdCartItem,
            });
        }

        else {
           cartItem.quantity = req.body.quantity

           await cartItem.reload();

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


module.exports = cartController;