var faker = require('faker');

const { routerConfig } = require('../util/router');

const handleGet = (req, res) => {
    res.send({ hello: `Apier API, ${faker.name.findName()}` });
};

module.exports = routerConfig({
    GET: handleGet,
});
