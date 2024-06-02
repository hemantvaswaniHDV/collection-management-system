import dotenv from 'dotenv';
dotenv.config();

interface Config {
  mongodbUri: string;
  port: number | string;
  }

export const config : Config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/collection-management',
  port: process.env.PORT || 3000,
  
};
