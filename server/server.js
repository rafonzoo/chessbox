const users     = require('./routes/user.route');
const auth      = require('./routes/auth.route');
const express   = require('express');
const parser    = require('body-parser');
const mongoose  = require('mongoose');
const cors      = require('cors');
const app       = express();

const db        = 'mongodb://localhost/dproject';
const port      = process.env.PORT || 4000;
const atlasUrl  = `mongodb+srv://rfzdev:chessbox@cluster0.09fng.mongodb.net/chessbox?retryWrites=true&w=majority`;

mongoose.connect(atlasUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true
})
	.then(()   => console.log('Now connected to database!'))
	.catch(err => console.error('Something went wrong', err));

// parse requests of content-type - application/json
// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors());
app.use(parser.json());
// app.use('/api/user', users);
// app.use('/api/auth', auth);
app.use(parser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));