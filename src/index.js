import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: './.env'})
const puerto = process.env.PORT
app.listen(puerto)
console.log(`Servidor Escuchando en el puerto, ${puerto}`)