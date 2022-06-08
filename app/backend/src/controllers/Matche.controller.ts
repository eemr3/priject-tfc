import { Request, Response } from 'express';
import BaseError from '../utils/errorBase';
import MatcheService from '../services/Matche.service';

class MatcheController {
  private _service = new MatcheService();
  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await this._service.getAll(inProgress as string);

    return res.status(200).json(matches);
  }

  async createMatche(req: Request, res: Response) {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
      inProgress } = req.body;
    const matche = await this._service.createMatche({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return res.status(201).json(matche);
  }

  async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.updateInProgress(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMathce(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await this._service.updateMatches(Number(id), homeTeamGoals, awayTeamGoals);

      return res.status(200).json(result);
    } catch (error) {
      return res.status((error as BaseError).status).json({ message: (error as Error).message });
    }
  }
}

export default MatcheController;
