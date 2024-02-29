import { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { registerUser, loginUser, logout } from '../controllers/sessionController.js'

const sessionsRouter = Router()

//Middleware de sesion
sessionsRouter.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://interlanhome:EBLLJLQdBm4T5iwG@cluster0.llav02p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 120 //unit in seconds
    }),
    secret: "sÑcret314159",
    resave: false,
    saveUninitialized: false
}))

//Route register user 
sessionsRouter.post('/api/sessions/register', registerUser)

//Route login
sessionsRouter.post('/api/sessions/login', loginUser)

//Route logout
sessionsRouter.post('/api/sessions/logout', logout)


export default sessionsRouter