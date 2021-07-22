'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    pictureurl: DataTypes.STRING,
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    coin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  users.associate=function (models){
    users.hasMany(models.follower_followeds,{
      foreignKey : 'followerId'
    })
    users.hasMany(models.follower_followeds,{
      foreignKey : 'followedId'
    })
  }

  return users;
};