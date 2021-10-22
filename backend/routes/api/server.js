const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { Server } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
	'/:userId(\\d+)',
	asyncHandler(async (req, res) => {
		console.log('INSIDE BACKEND ROUTE');
		const { userId } = req.params;
		console.log('USER ID', userId);
		const servers = await Server.findAll({
			where: {
				ownerId: +userId,
			},
		});
		return res.json({ servers });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { name, userId } = req.body;
		console.log(name, userId);
		const server = await Server.create({
			name: name,
			ownerId: userId,
		});

		return res.json(server);
	})
);
module.exports = router;
