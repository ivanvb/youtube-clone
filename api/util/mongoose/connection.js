const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://angelrojasm:IzPRD01u98llFBxU@cluster0.2nlud.mongodb.net/sampleConnection?retryWrites=true&w=majority',
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
