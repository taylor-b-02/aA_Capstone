'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			profilePicture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: [
						'hashedPassword',
						'email',
						'createdAt',
						'updatedAt',
					],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ['hashedPassword'] },
				},
				loginUser: {
					// attributes: { include: ['username', 'profilePicture'] },
					attributes: {},
				},
			},
		}
	);

	User.prototype.toSafeObject = function () {
		// remember, this cannot be an arrow function
		const { id, username, email, profilePicture } = this; // context will be the User instance
		return { id, username, email, profilePicture };
	};

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString());
	};

	User.getCurrentUserById = async function (id) {
		return await User.scope('currentUser').findByPk(id);
	};

	User.login = async function ({ credential, password }) {
		const { Op } = require('sequelize');
		const user = await User.scope('loginUser').findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (user && user.validatePassword(password)) {
			const validUser = await User.scope('currentUser').findByPk(user.id);
			// !REMOVE - console.log('validUser:', validUser);
			return validUser;
		}
	};

	User.signup = async function ({
		username,
		email,
		password,
		profileImageUrl,
	}) {
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			username,
			email,
			hashedPassword,
			profilePicture: profileImageUrl,
		});
		return await User.scope('currentUser').findByPk(user.id);
	};

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.Server, { foreignKey: 'ownerId', as: 'servers' });
	};
	return User;
};
