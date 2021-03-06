const Joi 			= require('joi');
const mongoose  = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	confirmPassword: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	entries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}],
	deposit: {
		type: Number,
	}
})

.method("toJSON", function() {
	const {
		_id,
		__v,
		...object
	} = this.toObject();

	return (object.id = _id) && object;
}));
 
function validateUser(user) {
	const schema = Joi.object({
		username: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
		confirmPassword: Joi.string().min(5).max(255).required()
	});

	return schema.validate(user);
}
 
exports.User = User;
exports.validate = validateUser;