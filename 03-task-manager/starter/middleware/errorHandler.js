const { CustomAPIError } = require('../errors/custom-error'); // Make sure the path is correct

const errorHandleMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Something went wrong, try again' });
}

module.exports = errorHandleMiddleware;