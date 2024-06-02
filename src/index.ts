import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import casesRoutes from './routes/casesRoutes';
import { dataImportService } from './services/dataImportService';
import * as cron from 'node-cron';

const app = express();


app.use('/api', casesRoutes);

mongoose.connect(config.mongodbUri)
.then(async() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

cron.schedule('0 10,17 * * *', async () => {
  await dataImportService.importData();
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
