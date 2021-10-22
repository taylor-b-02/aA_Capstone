'use strict';
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		'Message',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			channelId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			message: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 2000],
				},
			},
		},
		{}
	);
	Message.associate = function (models) {
		// associations can be defined here
		Message.belongsTo(models.Channel, {
			foreignKey: 'channelId',
			as: 'channel',
		});
		Message.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};
	return Message;
};
