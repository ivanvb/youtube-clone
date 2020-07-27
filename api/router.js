const routerConfig = (config) => {
    const { GET, PUT, POST, PATCH, DELETE } = config;

    return (req, res) => {
        switch (req.method) {
            case 'GET':
                GET && GET(req, res);
                break;
            case 'POST':
                POST && POST(req, res);
                break;
            case 'PUT':
                PUT && PUT(req, res);
                break;
            case 'PATCH':
                PATCH && PATCH(req, res);
                break;
            case 'DELETE':
                DELETE && DELETE(req, res);
                break;
        }
    };
};

module.exports = { routerConfig };
