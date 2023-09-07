import express from 'express'
import bodyParser from 'body-parser'
import connection from './db/index.js'
import cors from 'cors'
import { config } from "dotenv";
import userRouter from './Routes/userRoutes.js'
import bookRouter from './Routes/bookRoutes.js'

config()
const app = express()

app.use(cors(
    {
        "origin": "http://localhost:5173",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
      }
))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRouter)
app.use('/books',bookRouter)
connection.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
        console.log('Connected to mongodb')
    })
}).catch(err=>{
    console.log(err)
})