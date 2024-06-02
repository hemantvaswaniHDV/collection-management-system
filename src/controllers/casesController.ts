import { Request, Response } from 'express';
import { CaseModel } from '../models/caseModel';

class CasesController {
  public async getCasesByCity(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      const filter: any = {};

      if (startDate && endDate) {
        filter.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
      }

      const cases = await CaseModel.aggregate([
        { $match: filter },
        {
            $project: {
                institutionName: "$bankName",
                propertyType: "$propertyName",
                city: 1,
                borrowerName: 1,
                createdAt: 1,
            }
        }
    ]);

      res.status(200).json(cases);
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const casesController = new CasesController();
