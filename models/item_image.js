'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.item_image.belongsTo(models.item,{onDelete: 'CASCADE'});
    }
  };
  item_image.init({
    image: DataTypes.TEXT,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item_image',
  });
  return item_image;
};