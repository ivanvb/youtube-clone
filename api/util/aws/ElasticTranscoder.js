const aws = require('aws-sdk');
require('dotenv').config();

aws.config.setPromisesDependency();
aws.config.update({
	region: process.env.region,
	accessKeyId: process.env.accessKeyID,
	secretAccessKey: process.env.secretKey,
});

const elasticTranscoder = new aws.ElasticTranscoder();

exports.transcode = fileName => {
	return new Promise((resolve, reject) => {
		const fileType = 'mp4';
		const params = {
			PipelineId: process.env.PipelineId /* required */,
			Input: {
				Key: `${fileName}/base.${fileType}`,
				Container: 'auto',
				FrameRate: 'auto',
			},
			Outputs: [
				{
					Key: `${fileName}/360p.${fileType}`,
					PresetId: '1351620000001-000040',
				},
				{
					Key: `${fileName}/480p.${fileType}`,
					PresetId: '1351620000001-000030',
				},
				{
					Key: `${fileName}/720p.${fileType}`,
					ThumbnailPattern: `${fileName}/thumbnail-{count}`,
					PresetId: '1351620000001-000010',
				},
			],
		};

		elasticTranscoder.createJob(params, function (err, data) {
			if (err) reject(err);
			// an error occurred
			else resolve(data);
		});
	});
};
