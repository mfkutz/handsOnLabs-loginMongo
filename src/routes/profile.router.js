import { Router } from "express"
import { isAuthenticated } from "../middlewares/authMiddleware.js"

const profileRouter = Router()

//See profile user
profileRouter.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session.user })
})

export default profileRouter