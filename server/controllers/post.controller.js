const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

exports.create = async (req, res) => {
  const post = new Post({
    title       : req.body.title,
    description : req.body.description,
    postedby    : req.params.id,
    price       : req.body.price,
  });
  
  const user = await User.findById(req.params.id);
  // Find our user ID that posting the post
  // and push the post into user entries.
  user.entries.push(post);

  await post.save();
  await user.save();

  res.send(post);
}


exports.delete = async (req, res) => {
  const id = req.params.id;
  
  const post = await Post.findByIdAndDelete(id);
  
  try {
    if (!post) {
      res.status(404).send({
        message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
      });
    } else {
      res.send({
        message: "Post was deleted successfully!"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Post with id=" + id
    });
  }
}