const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const enviroment = require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }).parsed;

const upload = multer({ dest: 'uploads/' });

module.exports = {
    express,
    cors,
    axios,
    enviroment,
    upload,
    fs,
    path, jwt
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/storage/songs', express.static(path.join(__dirname, '..', 'storage', 'songs')));

app.use(session({
    secret: enviroment.HEX_SESSION,
    resave: false,
    saveUninitialized: true
}));

const viewsDir = path.join(__dirname, 'interfaces', 'views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
app.use(flash());
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.errorMsg = req.flash('error');
    res.locals.successMsg = req.flash('success');
    res.locals.req = req;
    next();
});



const routes = require('./interfaces/routeProvider/routes');
app.use(routes);

const port = enviroment.PORT || 3310;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


