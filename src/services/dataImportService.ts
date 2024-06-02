import axios from 'axios';
import { CaseModel } from '../models/caseModel';
import { Logger } from '../utils/logger';
import mongoose from 'mongoose';
import csvParser from 'csv-parser';
import {config} from '../config'

class DataImportService {
  private csvUrl: string = 'https://docs.google.com/spreadsheets/d/1jn9D3JrFg15MQEQ202RjgnfR1jMm-mtTRec-OPFglgE/export?format=csv';

  public async importData(): Promise<void> {
    try {
      const response = await axios.get(this.csvUrl, { responseType: 'stream' });

      response.data
        .pipe(csvParser())
        .on('data', async (row: any) => {
          const newCase = new CaseModel({
            bankName: row['Bank name'],
            propertyName: row['Property name'],
            city: row['City'],
            borrowerName: row['Borrower name'],
            createdAt: new Date(row['Created At'])||undefined
          });
          await newCase.save();
        })
        .on('end', () => {
          Logger.info('CSV file successfully processed');
        });
    } catch (error:any) {
      Logger.error(`Error importing data: ${error.message}`);
    }
  }
}

export const dataImportService = new DataImportService();