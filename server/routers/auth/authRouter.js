const express = require('express');
const authRouter = express.Router();
const AuthService = require("./authService");
const {check, validationResult} = require('express-validator');
const authService = new AuthService();

const roleMiddleware = require('../../middlewares/roleMiddleware')


authRouter.post('/register', [
        check('FullName', 'Name must be longer than 5 and shorter 12').isLength({min: 5, max: 20}),
        check('email', 'Incorrect email').isEmail(),
        check('login', 'Login must be longer than 5 and shorter 12').isLength({min: 5,max:15}),
        check('password', 'Password must be longer than 5 and shorter 12').isLength({min: 5, max: 15}),
    ]
    , async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Your from does not valid', errors})
            }

            const {FullName, email, login, password,} = req.body;
            const user = await authService.register(FullName, email, login, password,);
            res.json({message: "You have been successfully registered"});
        } catch (err) {
            res.status(err.status).json({ message: err.message })
        }

    })


authRouter.post('/login', async (req, res, next) => {
        try {
            const {password, login} = req.body;

            const token = await authService.login(login, password);
            // console.log(token);
             res.json(token);

        } catch (err) {

         console.log(err);
         res.status(err.status).json({ message: err.message })

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




module.exports = authRouter;