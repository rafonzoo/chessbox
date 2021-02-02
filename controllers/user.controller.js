const { User, validate } = require('../models/user.model');
const bcrypt 				 = require('bcrypt');

exports.create = async (req, res) => {
	// First Validate The Request
	if (validate(req.body).error) return res.status(400).send({
		message: validate(req.body).error.details[0].message
	})

	// Check if this user already exists
	let user  		= await User.findOne({ email: req.body.email });
	let userName 	= await User.findOne({ username: req.body.username });

	if (user) return res.status(400).send({
		message: '"email" you enter already exists'
	});

	else if (userName) return res.status(400).send({
		message: '"username" you enter already exists'
	});

	if (req.body.password !== req.body.confirmPassword) {
		return res.status(400).send({
			message: '"password" combination doesnt match'
		});
	}
  
	// Insert the new user if they do not exist yet
	user = new User({
		username 				: req.body.username,
		email 					: req.body.email,
		password 				: req.body.password,
		confirmPassword : req.body.confirmPassword,
		deposit					: 0,
	});

	const salt 						= await bcrypt.genSalt(10);
	user.password 				= await bcrypt.hash(user.password, salt);
	user.confirmPassword 	= await bcrypt.hash(user.confirmPassword, salt);
						  						await user.save();

	res.send({
		body: user,
		message: 'Register account success!'
	});
}

exports.findAll = async (req, res) => {
	const username = req.query.username;
	const queryName = {
		$regex: new RegExp(username),
		$options: "i"
	};

	const user = await User.find(() => {
		return username ? { name: queryName } : {}
	});
	
	try {
		res.send(user); } catch (error) {
		res.status(500).send({ message: error })
	}
}

exports.findOne = async (req, res) => {
	const user = await User.findById(req.params.id);

	try {
		if (!user) return res.status(404).send({
			message: "Not found account user with ID " + req.params.id 
		});
		
		res.send({
			body: user,
			message: "Found account with username " + user.username
		});

	} catch (error) {
		res.status(500).send({
			message: "Error retrieving account with ID " + req.params.id
		});
	}
}

exports.findOneAndUpdate = async (req, res) => {
	User.findByIdAndUpdate(req.params.id,
		{ $set: req.body }, { new: true }, (err, result) => {
			if (err) return res.status(404).send({
				message: "Error while updating account."
			});

			res.send({
				body: result,
				message: "Your account successfully updated!"
			});
		}
	);
}

exports.findOneAndDelete = async (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, result) => {
		if (err) return res.status(500).send({
			message: "Error while trying to remove account"
		});

		res.send({
			body: result,
			message: "Your account successfully removed!"
		});
	})
}