'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.item.hasMany(models.item_image,{as: 'images'});
      models.item.hasMany(models.cart);
    }
  };
  item.init({
    uuid: DataTypes.TEXT,
    name: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};