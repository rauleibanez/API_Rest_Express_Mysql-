import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes.js'
import indexRoutes from "./routes/index.routes.js";
import {pool} from './database.js'

const app = express()
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/products',productsRoutes)

export default app;