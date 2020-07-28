const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (event, context, callback) => {
    const number = Number(event.queryStringParameters.n);
    const offset = Number(event.queryStringParameters.page);

    const result = await Video.find()
        .limit(number)
        .skip(offset * number - number)
        .sort({ uploadDate: -1 })
        .populate('uploadingUser');

    let a = Object.keys(result).map((key) => result[key]);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ videos: a }),
    });
};

exports.handler = routerConfig({
    GET: handleGet,
});
