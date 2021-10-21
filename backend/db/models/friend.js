'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    userId1: DataTypes.NUMBER,
    userId2: DataTypes.NUMBER
  }, {});
  Friend.associate = function(models) {
    // associations can be defined here
  };
  return Friend;
};