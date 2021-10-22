'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Channels', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			serverId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Servers',
					},
				},
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(30),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Channels');
	},
};
