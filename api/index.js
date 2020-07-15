module.exports = (req, res) => {
    console.log('Logging from the serverless function');
    res.json({
        hello: 'Coming directly from a serverless function!',
    });
};
