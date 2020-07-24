const aws = require('aws-sdk');
require('dotenv').config();

const s3Bucket = process.env.bucket;
aws.config.setPromisesDependency();
aws.config.update({
	region: process.env.region,
	accessKeyId: process.env.accessKeyID,
	secretAccessKey: process.env.secretKey,
});

const s3 = new aws.S3();

exports.getSignedUrl = (req, res) => {
	const s3 = new aws.S3(); // Create a new instance of S3
	const fileName = req.body.fileName;
	const fileType = req.body.fileType;
	// Set up the payload of what we are sending to the S3 api
	const s3Params = {
		Bucket: s3Bucket,
		Key: `${fileName}/base.${fileType}`,
		Expires: 50,
		ContentType: fileType,
		ACL: 'public-read',
	};

	if (s3Params.Key === 'png') {
		s3Params.Key = `${base}thumbnail-00001.png`;
	}
	// Make a request to the S3 API to get a signed URL which we can use to upload our file
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err);
			res.json({ success: false, error: err });
		}
		// Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
		const returnData = {
			signedRequest: data,
			url: `https://${s3Bucket}.s3.amazonaws.com/${fileName}/base.${fileType}`,
		};
		res.send(returnData);
	});
};
exports.getFile = (fileName, res) => {
	const fileBase = fileName.split('.')[0];
	s3.getObject(
		{
			Bucket: s3Bucket,
			Key: `${fileBase}/${fileName}`,
		},
		(err, data) => {
			if (err) {
				res.send('No such file name found.');
			} else {
				res.send(data.Body);
			}
		}
	);
};

exports.deleteVideoFolder = async (id, res) => {
	const base = `${id}/`;
	const params = {
		Bucket: s3Bucket,
		Delete: {
			Objects: [
				{
					Key: `${base}480p.mp4`,
				},
				{
					Key: `${base}720p.mp4`,
				},
				{
					Key: `${base}base.mp4`,
				},
				{
					Key: `${base}thumbnail-00001.png`,
				},
				{
					Key: `${base}base.png`,
				},
				{
					Key: `${base}base.jpg`,
				},
			],
			Quiet: false,
		},
	};

	await s3.deleteObjects(params, function (err, data) {
		err ? res.send(err) : res.send(data);
	});
};
