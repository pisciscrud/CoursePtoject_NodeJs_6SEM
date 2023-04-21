const jwt = require('jsonwebtoken')
const AuthRepository = require("../routers/auth/authRepository");


module.exports = function (roles) {
    return async function (req, res, next) {

        if (req.method === "OPTIONS") {
            next()
        }
        const authRepository=new AuthRepository();
        try {

            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }

           const {roleId,id} = jwt.verify(token, process.env.SECRET_KEY);
            let hasRole = false;
            const role1 = await authRepository.findRoleById(roleId);

            roles.forEach(role=>
            {
                if (role == role1.Role_name)
                    hasRole=true
            })
            if (!hasRole) {
                return res.status(403).json({message: "You don't have access"})
            }
            req.userId = id;
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User isn't authorise"})
        }
    }
};