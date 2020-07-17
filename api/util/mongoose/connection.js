const mongoose = require('mongoose');

mongoose.connect(process.env.dbURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
