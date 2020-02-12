const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next()
    }

    try {
            // req.headers.authorization - лежит токен и беарер, забиаем только токен через split('')[1]
        const token = req.headers.authorization.split('')[1]; // "Bearer Token"

        if(!token) {
            return res.status(401).json({ message: 'Нет авторизации'})
        }
            // verify для раскодирования токена, передаем сам токен и секретную строку из конфига
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded;
        next()


    } catch (e) {
        return res.status(401).json({ message: 'Нет авторизации'})
    }
};