import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler} from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(morgan('tiny'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes start here
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// Routes end here

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res)=>{
    res.send('API runing..');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Backend started on port ${port}`));