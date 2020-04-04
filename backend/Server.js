const express = require('express');
// const bodyParser=require('body-parser');
const cors = require('cors') // cross- origin
const mongoose = require('mongoose');
require('dotenv').config();  //environment variables in .env fire
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true ,useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);
const connection = mongoose.connection;
connection.once(('open') , () => {
console.log("DATABASE CONNECTION ESTABLISHED")
})
const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises' , exerciseRouter);
app.use('/users' , usersRouter)
app.listen(port , () =>{
console.log("server running")
});

