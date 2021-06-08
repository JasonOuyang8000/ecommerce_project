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
    }
  };
  item.init({
    uuid: DataTypes.TEXT,
    name: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'items',
  });
  return item;
};