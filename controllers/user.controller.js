const { User, validate } = require('../models/user.model');
const bcrypt 				 = require('bcrypt');

exports.create = async (req, res) => {
	// First Validate The Request
	if (validate(req.body).error) return res.status(400).send(
		validate(req.body).error.details[0].message
	)

	// Check if this user already exisits
	let user = await User.findOne({ email: req.body.email });
  
	if (user) return res.status(400).send(
		"Email that you enter already exist."
	);
  
	// Insert the new user if they do not exist yet
	user = new User({
		username : req.body.username,
		email 	 : req.body.email,
		password : req.body.password
	});

	const salt 			= await bcrypt.genSalt(10);
	user.password 	= await bcrypt.hash(user.password, salt);
						  			await user.save();

	res.send(user);
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
	const user = await User.findById(req.params.id).populate('entries');

	try {
		if (!user)
         res.status(404).send({ message: "Not found user with id " + req.params.id });
		else
		   res.send(user);

	} catch (error) {
		res.status(500).send({
			message: "Error retrieving user with id " + req.params.id
		});
	}
}