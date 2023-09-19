import {DataTypes} from 'sequelize';
import db from '../models/index';

const User = db.define('user_sera', {
    Fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User