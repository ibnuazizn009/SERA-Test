import { Sequelize } from "sequelize";
import config from "../config/db_config";

const sequelize_db = new Sequelize(config.mysqlConfig.db, config.mysqlConfig.user, config.mysqlConfig.password, {
    host: config.mysqlConfig.host,
    port: config.mysqlConfig.port,
    dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

// type any_db = {
//     Sequelize: any,
//     sequelize: any,
//     users: any
// };
// const db = <any_db>{};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize_db;

export default sequelize_db;