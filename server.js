var express = require('express')
var cors = require('cors')

var dotenv = require('dotenv')

require('./db')


dotenv.config();

const port = process.env.port

var app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));


const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');


app.use('/api',userRoute)
app.use('/p',productRoute)


app.listen(port,()=>{
    console.log(`server up running on port ${port}`)
})