// const Joi 			= require('joi');
const mongoose  = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
  title: {
		type: String,
		required: true,
		// minlength: 5,
		// maxlength: 50
	},
  description: {
		type: String,
		required: true,
		// minlength: 15,
	},
	price: {
		type: Number,
		required: true,
	},
  postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
	},
	hiredby: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// function validatePost(post) {
// 	const schema = Joi.object({
// 		title: Joi.string().min(5).max(50).required(),
// 		description: Joi.string().min(15).max(255).required(),
// 	});

// 	return schema.validate(post);
// }

exports.Post = Post;
// exports.validate = validatePost;