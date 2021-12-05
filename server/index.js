require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const path = require('path')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 4000

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'upload')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Server Working'})
})

const start = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,()=>{console.log(`Server started port on ${PORT}`)})
    }catch(e){
        console.log(e)
    }
}

start()