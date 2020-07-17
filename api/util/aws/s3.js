const aws = require('aws-sdk');
const s3Bucket = process.env.bucket;
aws.config.setPromisesDependency();
aws.config.update({
	region: process.env.region,
	accessKeyId: process.env.accessKeyID,
	secretAccessKey: process.env.secretKey,
});

const s3 = new aws.S3();

exports.uploadFile = (file, fileName) => {
	return new Promise((resolve, reject) => {
		let fileParts = file.name.split('.');
		let fileType = fileParts[1];

		s3.putObject(
			{
				Bucket: s3Bucket,
				Key: `${fileName}/base.${fileType}`,
				ACL: 'public-read',
				Body: file.data,
				Metadata: { type: fileType },
			},
			function (err) {
				if (err) {
					return reject(err);
				} else {
					return resolve('Ok');
				}
			}
		);
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
