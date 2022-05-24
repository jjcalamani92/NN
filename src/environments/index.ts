import * as dotenv from 'dotenv';
dotenv.config();

export const PORT: number = +process.env.PORT || 3000;

export const MONGO_URL: string = process.env.MONGODB_URL
