import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv'
//import path from 'path'

dotenv.config({ path: './.env'})

export const pool =createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,    
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DARABASE_PORT,
    database: process.env.DATABASE
});

