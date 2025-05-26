import { DataTypes, Sequelize } from 'sequelize';
import sequelize from "../db";

export const Product = sequelize.define('tbl_product',
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tbl_category', // Assuming you have a category model
                key: 'id'
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        details: {
            type: DataTypes.STRING(500),
            allowNull: false,
        }
    },
    {
        tableName: 'tbl_product',
        timestamps: false,
    }
);