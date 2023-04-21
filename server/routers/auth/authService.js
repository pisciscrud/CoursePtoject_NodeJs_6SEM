const AuthRepository = require("./authRepository");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require("http-errors");

class AuthService {

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async login(login, password) {

        const user = await this.authRepository.findUserByLogin(login);


        if (!user) {
            throw createError(400, "User with this username does not exist")
        }


        if (!(await bcrypt.compare(password, user.password))) {
            throw createError(400, "Password is incorrect");
        }


        return jwt.sign({id: user.id, roleId: user.id_role}, process.env.SECRET_KEY, {expiresIn: '1h'});

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

        const {roleId} = await jwt.verify(token, process.env.SECRET_KEY);
     //   console.log('roleId from authService' + roleId);
        const role = await this.authRepository.findRoleById(roleId);
        //console.log('ROLE' + role.Role_name);
        const admin = (role.Role_name === "admin") ? true : false;
        return admin;

    }
}

module.exports = AuthService;