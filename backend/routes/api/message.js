const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { Message } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
	'/:channelId(\\d+)',
	asyncHandler(async (req, res) => {
		const { channelId } = req.params;
		const messages = await Server.findAll({
			where: {
				channelId: channelId,
			},
		});
		return res.json({ messages });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { message, userId, channelId } = req.body;
		const message = await Message.create({
			message,
			userId,
			channelId,
		});
		return res.json(message);
	})
);

router.delete(
	'/:messageId(\\d+)',
	asyncHandler(async (req, res) => {
		const { messageId } = req.params;
		const message = await Message.findByPk(+messageId);
		message.destroy();
		return res.json({ ok: true });
	})
);

module.exports = router;
