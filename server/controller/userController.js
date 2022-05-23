const userModel = require("../model/userModel");
const verifiedModel = require("../model/verifiedModel");
const cloudinary = require("../utils/coludinary");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
	service: process.env.SERVICE,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
});

const getUsers = async (req, res) => {
	try {
		const users = await userModel.find();
		res.status(200).json({
			message: "success",
			data: users,
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

const createUsers = async (req, res) => {
	try {
		const { email, userName, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

		const user = await userModel.create({
			email,
			userName,
			password: hashed,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});

		const createToken = crypto.randomBytes(32).toString("hex");
		const testToken = crypto.randomBytes(4).toString("binary");
		const getToken = jwt.sign({ createToken }, process.env.SECRET, {
			expiresIn: process.env.EXPIRES,
		});

		await verifiedModel.create({
			token: getToken,
			userID: user._id,
			_id: user._id,
		});

		const mailOptions = {
			from: "ajmarketplace52@gmail.com",
			to: email,
			subject: "registration verification",
			html: `
            <h3>THis is to verify your account, please use the <a
            href="http://localhost:1222/api/user/${user._id}/${getToken}"
            >Link</a> to finish up your reg, just a text code ${testToken}.</h3>
            `,
		};

		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Mail sent", info.response);
			}
		});

		res.status(200).json({
			message: "Please check your mail for completion",
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

const createDeveloper = async (req, res) => {
	try {
		const { email, userName, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

		const testToken = crypto.randomBytes(4).toString("hex");

		const user = await userModel.create({
			email,
			userName,
			developerToken: testToken,
			password: hashed,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});

		const createToken = crypto.randomBytes(32).toString("hex");

		console.log(testToken);

		const getToken = jwt.sign({ createToken }, process.env.SECRET, {
			expiresIn: process.env.EXPIRES,
		});

		await verifiedModel.create({
			token: getToken,
			userID: user._id,
			_id: user._id,
		});

		const mailOptions = {
			from: "ajmarketplace52@gmail.com",
			to: email,
			subject: "registration verification",
			html: `
		    <h3>THis is to verify your account, please use the <a
		    href="http://localhost:3001/api/user/dev/${user._id}/${getToken}"
		    >Link</a> to finish up your reg, Here is your developer's secret code: ${testToken}.</h3>
		    `,
		};

		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Mail sent", info.response);
			}
		});

		res.status(200).json({
			message: "Please check your mail for completion",
		});
	} catch (err) {
		res.status(404).json({
			message: err,
		});
	}
};

const getDevToken = async (req, res) => {
	try {
		// const {developerToken} = req.body
		const user = await userModel.findById(req.params.id);

		if (user) {
			await userModel.findByIdAndUpdate(
				req.params.id,
				{
					myToken: req.params.token,
				},
				{ new: true }
			);

			await verifiedModel.findByIdAndUpdate(
				user._id,
				{
					token: "",
					userID: user._id,
				},
				{ new: true }
			);

			res.status(200).json({
				message: "user has been authorized, you can now sign in",
			});
		} else {
			res.status(404).json({
				message: "user not authorized",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

const verifiedDeveloper = async (req, res) => {
	try {
		const { developerToken } = req.body;

		const user = await userModel.findById(req.params.id);

		if (user) {
			if (developerToken === user.developerToken) {
				await userModel.findByIdAndUpdate(
					user._id,
					{ verified: true, isDeveloper: true },
					{ new: true }
				);

				res.status(404).json({
					message: "Awesome you can now sign in",
				});
			} else {
				res.status(404).json({
					message: "no user",
				});
			}
		} else {
			res.status(404).json({
				message: "no user",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

const getToken = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);

		if (user) {
			await userModel.findByIdAndUpdate(
				req.params.id,
				{
					verified: true,
					myToken: req.params.token,
				},
				{ new: true }
			);

			await verifiedModel.findByIdAndUpdate(
				user._id,
				{
					token: "",
					userID: user._id,
				},
				{ new: true }
			);

			res.status(200).json({
				message: "user has been authorized, you can now sign in",
			});
		} else {
			res.status(404).json({
				message: "user not authorized",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

const signinUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			const checkPassword = await bcrypt.compare(password, user.password);

			if (checkPassword) {
				if (user.verified && user.myToken !== "") {
					const token = jwt.sign(
						{
							_id: user._id,
						},
						process.env.SECRET,
						{ expiresIn: "2d" }
					);
					const { password, ...info } = user._doc;

					res.status(201).json({
						message: "welcome back",
						data: { token, ...info },
					});
				} else {
					const createToken = crypto.randomBytes(32).toString("hex");

					const getToken = jwt.sign({ createToken }, process.env.SECRET, {
						expiresIn: process.env.EXPIRES,
					});
					const mailOptions = {
						from: "ajmarketplace52@gmail.com",
						to: email,
						subject: "registration verification",
						html: `
            <h3>THis is to verify your account, please use the <a
            href="http://localhost:1222/api/user/${user._id}/${getToken}"
            >Link</a> for completion.</h3>
            `,
					};

					transport.sendMail(mailOptions, (err, info) => {
						if (err) {
							console.log(err.message);
						} else {
							console.log("Mail sent", info.response);
						}
					});

					res.status(200).json({
						message:
							"Your mail hasn't been verified, please go to your email for verification",
					});
				}
			} else {
				res.status(404).json({
					message: "password not correct",
				});
			}
		} else {
			res.status(404).json({
				message: "user not existing",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

module.exports = {
	getUsers,
	createUsers,
	getToken,
	signinUser,
	createDeveloper,
	getDevToken,
	verifiedDeveloper,
};
