import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import profileRouter from './routes/profile.router.js'

const app = express()
const port = 8080
app.listen(port, () => console.log(`Server online on port ${port}`))

app.use(cookieParser())


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Templates
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/', usersRouter)
app.use('/', sessionsRouter)
app.use('/', profileRouter)


// Connection to DB Atlas
mongoose
    .connect('mongodb+srv://interlanhome:EBLLJLQdBm4T5iwG@cluster0.llav02p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
    })