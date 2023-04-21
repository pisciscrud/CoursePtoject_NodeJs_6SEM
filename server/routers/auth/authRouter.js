const express = require('express');
const authRouter = express.Router();
const AuthService = require("./authService");
const {check, validationResult} = require('express-validator');
const authService = new AuthService();

const roleMiddleware = require('../../middlewares/roleMiddleware')


authRouter.post('/register', [
        check('FullName', 'Name must be longer than 3 and shorter 12').isLength({min: 3, max: 20}),
        check('email', 'Incorrect email').isEmail(),
        check('login', 'Login must be longer than 3 and shorter 12').isLength({min: 3, max: 12}),
        check('password', 'Password must be longer than 3 and shorter 12').isLength({min: 3, max: 12}),
    ]
    , async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect request', errors})
            }
            console.log(req.body);
            const {FullName, email, login, password,} = req.body;
            const user = await authService.register(FullName, email, login, password,);
            res.json({message: "User was created"});
        } catch (err) {
            next(err);
        }

    })


authRouter.post('/login', async (req, res, next) => {
        try {


            const {password, login} = req.body;

            const token = await authService.login(login, password);
            res.json(token);

        } catch (err) {
            next(err);

        }
    }
)

authRouter.get("/admin", async (req, res, next) => {
    try {

        const token = req.headers['authorization'].split(' ')[1];

        const isAdmin = await authService.isAdmin(token);

        res.send(isAdmin);
    } catch (e) {
        next(e);
    }
});

authRouter.get('/users', roleMiddleware(["user"]), async (req, res) => {
    res.json('eferf');
})


module.exports = authRouter;