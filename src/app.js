const express = require('express');
const cookieParser = require('cookie-parser');





const authRoutes              = require('./routes/authRouter');
const usersRoutes             = require('./routes/user.routes')


const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',   authRoutes);
app.use('/api/users',  usersRoutes)




//export app
module.exports = app;