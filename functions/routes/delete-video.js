const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const s3 = require('../util/aws/s3');

const handleDelete = async (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const query = await Video.findByIdAndDelete(id);
    s3.deleteVideoFolder(id, callback);
};

exports.handler = routerConfig({
    DELETE: handleDelete,
});
