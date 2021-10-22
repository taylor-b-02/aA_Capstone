'use strict';
module.exports = (sequelize, DataTypes) => {
	const Server = sequelize.define(
		'Server',
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 50],
				},
			},
			serverImage: {
				type: DataTypes.STRING,
			},
		},
		{}
	);
	Server.associate = function (models) {
		// associations can be defined here
		Server.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
		Server.hasMany(models.Channel, { as: 'channels' });
	};
	return Server;
};
