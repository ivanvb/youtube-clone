const routerConfig = (config) => {
    const { GET, PUT, POST, PATCH, DELETE } = config;

    return (event, context, callback) => {
        switch (event.httpMethod) {
            case 'GET':
                GET && GET(event, context, callback);
                break;
            case 'POST':
                POST && POST(event, context, callback);
                break;
            case 'PUT':
                PUT && PUT(event, context, callback);
                break;
            case 'PATCH':
                PATCH && PATCH(event, context, callback);
                break;
            case 'DELETE':
                DELETE && DELETE(event, context, callback);
                break;
        }
    };
};

module.exports = { routerConfig };
