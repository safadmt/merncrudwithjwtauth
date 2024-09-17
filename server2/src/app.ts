import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user';
import authRoute from './routes/auth';
import productRoute from './routes/products';
import brandRoute from './routes/brand';
import categoryRoute from './routes/category';
import { handleError } from './middleware/errorHandling';

const app = express();

// Middleware setup
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes setup
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/brands', brandRoute);
app.use('/api/categories', categoryRoute);

// Error handling middleware
app.use(handleError);

export default app;
