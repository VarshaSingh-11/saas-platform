const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

exports.signup = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ name, email, password: hashedPassword });
		await user.save();
		const token = jwt.sign({ id: user.id }, config.jwtSecret, {
			expiresIn: "1h",
		});
		res.status(201).json({
			status: true,
			content: {
				data: {
					_id: user.id,
					name: user.name,
					email: user.email,
					created_at: user.created_at,
				},
				meta: {
					access_token: token,
				},
			},
		});
	} catch (error) {
		res.status(400).json({ status: false, error: error.message });
	}
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).json({ status: false, error: "User not found" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res
				.status(400)
				.json({ status: false, error: "Invalid credentials" });

		const token = jwt.sign({ id: user.id }, config.jwtSecret, {
			expiresIn: "1h",
		});
		res.json({
			status: true,
			content: {
				data: {
					_id: user.id,
					name: user.name,
					email: user.email,
					created_at: user.created_at,
				},
				meta: {
					access_token: token,
				},
			},
		});
	} catch (error) {
		res.status(400).json({ status: false, error: error.message });
	}
};

exports.getMe = async (req, res) => {
	res.json({
		status: true,
		content: {
			data: {
				_id: req.user.id,
				name: req.user.name,
				email: req.user.email,
				created_at: req.user.created_at,
			},
		},
	});
};
