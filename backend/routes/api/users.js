const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username')
		.not()
		.isEmail()
		.withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	handleValidationErrors,
];

// Sign up
router.post(
	'/',
	singleMulterUpload('image'),
	validateSignup,
	asyncHandler(async (req, res) => {
		const { email, password, username } = req.body;
		let profileImageUrl = null;
		req.file
			? (profileImageUrl = await singlePublicFileUpload(req.file))
			: '';
		const user = await User.signup({
			email,
			username,
			password,
			profileImageUrl,
		});

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

module.exports = router;
