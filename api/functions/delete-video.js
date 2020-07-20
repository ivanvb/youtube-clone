const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const s3 = require('../util/aws/s3');

const handleDelete = async (req, res) => {
	const id = req.query.id;
	const query = await Video.findByIdAndDelete(id);
	console.log(query);
	//s3 object deletion code
	s3.deleteVideoFolder(id, res);
};

module.exports = routerConfig({
	DELETE: handleDelete,
});
