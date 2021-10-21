'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    ownerId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    serverImage: DataTypes.STRING
  }, {});
  Server.associate = function(models) {
    // associations can be defined here
  };
  return Server;
};