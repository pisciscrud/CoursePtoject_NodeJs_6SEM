const AuthRepository = require("./authRepository");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require("http-errors");
const redis = require("redis")

class AuthService {
    

    constructor() {
        this.authRepository = new AuthRepository();
        this.redisClient = new redis.createClient()
    }

    async login(login, password) {
        
            const user = await this.authRepository.findUserByLogin(login);

            if (!user) {
                throw createError(400, "User with this username does not exist")
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw createError(400, "Password is incorrect");
            }

            return jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '24h'});
       
    }

    async register(FullName, email, login, password) {
        const user = await this.authRepository.findUserByLogin(login);

        if (user) {
            throw new createError(400, "User already exists");
        }


        const hashedPassword = await bcrypt.hash(password, 8);


        const registeredUser = await this.authRepository.createUser(FullName, hashedPassword, login, email);

        // return jwt.sign({id: registeredUser.id, roleId: registeredUser.role_id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    }

    async isAdmin(token) {


        const {id} =  jwt.verify(token, process.env.SECRET_KEY);
        const user = await this.authRepository.findUserById(id);
        const admin = (user.id_role === 2) ? true : false;
        // const {roleId} = await jwt.verify(token, process.env.SECRET_KEY);
        //
        // const role = await this.authRepository.findRoleById(roleId);
        //
        // const admin = (role.Role_name === "admin") ? true : false;
       return admin;

    }

    async refreshToken(oldRefreshToken) {
        const isExists = !!(await this.redisClient.get(oldRefreshToken));

        if(!isExists) throw new Error('Refresh token is not valid');

        const { userId } = jwt.verify(oldRefreshToken, 'REFRESH_TOKEN_SECRET');

        // TODO: достать юзера, опрокинуть его инфу в новый рефреш токен, и вернуть эту залупу
        const newAccessToken = jwt.sign({id: user.id, roleId: user.id_role}, process.env.SECRET_KEY, { expiresIn: '1h' });

    }
}

module.exports = AuthService;