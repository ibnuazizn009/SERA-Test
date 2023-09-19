import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import cors from 'cors';
import createHttpError from 'http-errors';
import { Server } from 'http';
import User from './routes/user-routes';
import db from './models/index';
import config from './config/db_config';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(config.apiPaths.users, User);

db.authenticate().then(() => {
    console.log('🌩  Connection has been established successfully.');
}).catch((error) => {
    console.error('⛵  Unable to connect to the database: ', error);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
}

app.use(errorHandler);

const server: Server = app.listen(3000, () => console.log("🚀  Server running on port 3000"));