const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { Channel } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// GET Channels
router.get(
	'/:serverId(\\d+)',
	asyncHandler(async (req, res) => {
		console.log('\nHIT CHANNEL GET ROUTE\n');
		const { serverId } = req.params;
		const channels = await Channel.findAll({
			where: {
				serverId: +serverId,
			},
		});
		return res.json({ channels });
	})
);

// Create (POST) a channel
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { name, serverId } = req.body;
		const newChannel = await Channel.create({
			name,
			serverId,
		});

		return res.json(newChannel);
	})
);

// Edit a channel
//! REFACTOR NOTES: Should I exclude the :channelId and just include the id in the body?
router.put(
	'/:channelId',
	asyncHandler(async (req, res) => {
		const { channelId } = req.params;
		const { name } = req.body;
		const channel = await Channel.findyByPk(channelId);
		channel.name = name;
		await channel.save();
		return channel;
	})
);

// Delete a channel
router.delete(
	'/:channelId',
	asyncHandler(async (req, res) => {
		const { channelId } = req.params;
		const channel = await Channel.findyByPk(channelId);
		channel.destroy();
		return { ok: true };
	})
);

module.exports = router;
