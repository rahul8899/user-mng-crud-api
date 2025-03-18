import { Sequelize } from 'sequelize'
import { DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../config/config'

const db: any = {}
const sequelize: any = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mssql',
  port: DB_PORT,
  pool: {
    max: 25,
    min: 0,
    idle: 10000,
  },
  logging: false,
  username: DB_USER,
  password: DB_PASSWORD,
  ssl: true,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    options: {
      requestTimeout: 90000,
    }
  }
})

export default sequelize;
