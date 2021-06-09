const { Op } = require('sequelize');
const models = require('../models');

const itemController = {}

itemController.getAll = async (req, res) => {
    try {
       const items = await models.item.findAll()
       
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

module.exports = itemController