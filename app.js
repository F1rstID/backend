require('dotenv').config();
const express = require('express');
const cookieParesr = require('cookie-parser');
const HttpExceptionFilter = require('./middleware/http.exception.middleware');
const NotFoundFilter = require('./middleware/page.notfound.middleware');

//* 컨트롤러 에다가 require('express-async-errors') 해주세요! 

const app = express();
const port = process.env.PORT || 3000

//* Middleware
app.use(express.json());
app.use(cookieParesr());





//* HttpException Filter
app.use(HttpExceptionFilter);
app.use(NotFoundFilter);

//* 
app.listen(port, () => { });