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

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const servers = await Server.findAll();
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

router.delete(
	'/:serverId(\\d+)',
	asyncHandler(async (req, res) => {
		const { serverId } = req.params;
		const server = await Server.findByPk(+serverId);
		console.log(`\n\n${server}\n\n`);
		server.destroy();
		return res.json({ ok: true });
	})
);

// Edit a server
//! REFACTOR NOTES: Should I exclude the :channelId and just include the id in the body?
router.put(
	'/:serverId',
	asyncHandler(async (req, res) => {
		const { serverId } = req.params;
		const { name } = req.body;
		const server = await Server.findByPk(+serverId);
		server.name = name;
		await server.save();

		return res.json(server);
	})
);

module.exports = router;
