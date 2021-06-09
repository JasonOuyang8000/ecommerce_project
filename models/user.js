const { generatePassword } = require('../helpers/helperFunctions');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.cart);
    }
  };
  user.init({
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
    oauth: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('afterValidate', async(user,options) => {
    const hashedPassword = generatePassword(user.password);
    user.password = hashedPassword
  })

  return user;
};