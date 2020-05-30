const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    let token;
    if(authHeader) {
        token = authHeader.split(' ')[1];

        if(!token) {
            const error = new Error('Not authenticated!');
            error.statusCode = 500;
            throw error;
        }
    } else {
        const error = new Error('Not authenticated!');
        error.statusCode = 500;
        throw error;
    }
    console.log('--------->>', token);

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'thisisasecretsecretkeyohyeah');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken) {
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};
