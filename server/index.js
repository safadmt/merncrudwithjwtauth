import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path'
const curreFilePath  = fileURLToPath(import.meta.url)
const app = express();

import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import authRoute from './routes/auth.js';

app.use('/', express.static(path.join(dirname(curreFilePath), 'public')))

app.use(cors({origin:'http://localhost:3000'})) 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/auth', authRoute)
const PORT = process.env.PORT || 4000
app.listen(PORT, err=> err ? console.log(err) : console.log("server connected on " + PORT))