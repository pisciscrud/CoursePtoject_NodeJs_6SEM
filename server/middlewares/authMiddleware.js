const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/api-error');
const tokenService=require('../services/token-service')
module.exports = function (req, res, next) {
    // if (req.method === "OPTIONS") {
    //     next()
    // }
    //
    // try {
    //     const token = req.headers.authorization.split(' ')[1]
    //     if (!token) {
    //         return res.status(403).json({message: "Пользователь не авторизован"})
    //     }
    //     const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    //     req.user = decodedData
    //     next()
    // } catch (e) {
    //     console.log(e)
    //     return res.status(403).json({message: "Пользователь не авторизован"})
    // }
    try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
        return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
} catch (e) {
    return next(ApiError.UnauthorizedError());
}

};