require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound.js')
const errorHandler = require('./middleware/errorHandler.js')
//middleware:
app.use(express.static('./public'))
app.use(express.json())
//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 3000;
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('server is listening to port 3000'));
    } catch (error) {
        console.log(error)
    }
}

start()