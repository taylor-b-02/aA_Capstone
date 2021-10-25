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
		const { userId } = req.params;
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
		const server = await Server.create({
			name: name,
			ownerId: userId,
		});

		return res.json(server);
	})
);
module.exports = router;
