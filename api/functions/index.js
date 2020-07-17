var faker = require('faker');
const fs = require('fs');

const { routerConfig } = require('../util/router');

const handleGet = (req, res) => {
    console.log(req.body);
    res.send({ hello: `Apier API, ${faker.name.findName()}` });
};

module.exports = routerConfig({
    GET: handleGet,
    POST: handleGet,
});
