'use strict';
module.exports = (sequelize, DataTypes) => {
	const Channel = sequelize.define(
		'Channel',
		{
			serverId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30],
				},
			},
		},
		{}
	);
	Channel.associate = function (models) {
		// associations can be defined here
		Channels.belongsTo(models.Server, {
			foreignKey: 'serverId',
			as: 'server',
		});
	};
	return Channel;
};
