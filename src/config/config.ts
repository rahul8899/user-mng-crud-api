import { config } from 'dotenv'
config()

export const PORT = Number(process.env.PORT ?? 9001)
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || ''
export const SESSION_EXPIRY = process.env.SESSION_EXPIRY || 15
export const DB_PORT = Number(process.env.DB_PORT) || 3306
export const DATABASE = process.env.DATABASE || ''
export const DB_USER = process.env.DB_USER || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || ''