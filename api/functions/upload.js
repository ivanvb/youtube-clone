const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePost = async (req, res) => {
	console.log(req.body);
	console.log('--------\n' + req.file);
	//const result = await sampleModel.create(req.body);
	//const fileName = result._id;
	//const upload = await s3.uploadFile(file, fileName);

	/*if (upload === 'Ok') {
		const transcode = await elasticTranscoder.transcode(fileName);
		res.send(transcode);
	} else {
		res.send(upload);
    }*/
	res.send('Hello');
};

module.exports = routerConfig({
	POST: handlePost,
});
