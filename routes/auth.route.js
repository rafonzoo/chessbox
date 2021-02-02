const Joi       = require('joi');
const JWT       = require('jsonwebtoken');
const config    = require('config');
const bcrypt    = require('bcrypt');
const { User }  = require('../models/user.model');
const express   = require('express');
const router    = express.Router();

router.post('/', async (req, res) => {
  // First Validate The HTTP Request
  if (validate(req.body).error) return res.status(400).send({
    message: validate(req.body).error.details[0].message
  });

  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({
    message: '"email" is incorrect or not recognized.'
  });

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({
    message: '"password" is incorrect or not recognized.'
  });

  const token = JWT.sign({ id: user.id }, config.get('PrivateKey'));

  res.send({
    body: token,
    message: 'Authenticating success!'
  });
});

function validate(req) {
  const schema = Joi.object({
    email    : Joi.string().required().email(),
    password : Joi.string().required()
  });

  return schema.validate(req);
}

module.exports = router;