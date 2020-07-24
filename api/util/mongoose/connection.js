const mongoose = require('mongoose');

console.log(process.env.dbURL, process.env.bucket);
mongoose.connect(process.env.dbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
