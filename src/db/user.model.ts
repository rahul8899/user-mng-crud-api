import { DataTypes, Sequelize } from 'sequelize';
import sequelize from "../db";

export const User = sequelize.define('tbl_user',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
    },
    {
        tableName: 'tbl_user',
        timestamps: false,
    }
);