const express = require('express');
const cookieParser = require('cookie-parser');





const authRoutes              = require('./routes/authRouter');
const usersRoutes             = require('./routes/user.routes');
const serviceRoutes           = require('./routes/service.routes');


const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',         authRoutes);
app.use('/api/users',        usersRoutes);
app.use('/api/service',      serviceRoutes);




//export app
module.exports = app;