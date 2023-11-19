/************************************************** 
  Name    : "app.js"
  Version : "0.1.0"
  Descripcion : "API REST para panaderia"
  Objetivo : "Almacenamiento de datos y control de 
              de acceso a modificaciones" 
  Autor    : "ribanez"
  Fecha    : 16/11/2023          
  ------------------------------------------------
  "documentacion": {
  }
 **************************************************   
*/
import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/users.routes.js'
import indexRoutes from "./routes/index.routes.js";

const app = express()
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/products/api/',productsRoutes)
app.use('/users/api/',usersRoutes)

export default app;