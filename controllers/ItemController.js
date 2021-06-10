const { literal } = require('sequelize');
const models = require('../models');

const itemController = {}

itemController.getAll = async (req, res) => {
    try {
       const items = await models.item.findAll({
            include: 'images'
       })
       
       res.status(200).json({
           message: 'All items found',
           items
       })

    } catch (error) {
        res.status(400).json({
            message: 'Could not get all items',
            error
        })
    }
}

itemController.getRandItems = async (req,res) => {
    try {
        const items = await models.item.findAll({
            order: literal('random()'), limit: 3,
            include: {
                model: models.item_image,
                as: 'images'
            } 
        })

        return res.status(200).json({
            message: 'All items found',
            items
        })
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Could not get all items',
            error
        })
    }
}
module.exports = itemController