const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleDelete = async (req, res) => {
    const id = req.params.id;
    await Video.findByIdAndDelete(id).then((video) => {
        if(!video){
            return res.status(404).send()
        }
        res.send(video)
    })
};

module.exports = routerConfig({
	DELETE: handleDelete,
});