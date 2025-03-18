import { DataTypes, Sequelize } from 'sequelize';
import sequelize from "../db";

export const Category = sequelize.define('tbl_category',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
    },
    {
        tableName: 'tbl_category',
        timestamps: false,
    }
);