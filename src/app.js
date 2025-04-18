const express = require('express');
const cookieParser = require('cookie-parser');





const authRoutes = require('./routes/authRouter');



const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',   authRoutes)




//export app
module.exports = app;