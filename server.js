import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose  from 'mongoose';
import session from 'express-session';
import authRoute from './routes/adminRoute.js';
import blogRoute from './routes/blogRoute.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const adminRootPath = '/admin';

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine' , 'ejs');


mongoose.connect(process.env.DB_URI)
        .then(() => console.log('DATABASE IS CONNECTED'))
        .catch(err => console.log(err));



app.use(morgan('dev'));

app.use(adminRootPath , authRoute);
app.use('/' , blogRoute);


app.listen(PORT , () => {
    console.log('app is listening at PORT ' + PORT)
    console.log(`admin dashboard is ready at localhost:${PORT}${adminRootPath}`)
});