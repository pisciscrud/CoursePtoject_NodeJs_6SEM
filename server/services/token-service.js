const jwt = require('jsonwebtoken');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})

        return {
            accessToken,

        }
    }

    validateAccessToken(token) {
        try {
            const roleId = jwt.verify(token, process.env.SECRET_KEY);
            return roleId;
        } catch (e) {
            return null;
        }
    }


}

module.exports = new TokenService();