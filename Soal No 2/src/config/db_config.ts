import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || '8080',
    apiPaths:{
        users: '/api'
    },
    mysqlConfig: {
        host: process.env.DB_HOST || '<DB_HOST>',
        user: process.env.DB_USER || '<DB_USER>',
        password: process.env.DB_PASSWORD || '<DB_PASSWORD>',
        db: process.env.DATABASE || 'DATABASE',
        port: Number(process.env.DB_PORT) || 3306,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}