import { Sequelize } from "sequelize";
import config from "../config/db_config";

const sequelize_db = new Sequelize(config.mysqlConfig.db, config.mysqlConfig.user, config.mysqlConfig.password, {
    host: config.mysqlConfig.host,
    port: config.mysqlConfig.port,
    
})