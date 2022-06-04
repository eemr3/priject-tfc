import { Request, Response } from 'express';
import MatcheService from '../services/Matche.service';

class MatcheController {
  private _service = new MatcheService();
  private _inprogress: boolean;
  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    this._inprogress = inProgress === 'true';
    const matches = await this._service.getAll(this._inprogress);

    return res.status(200).json(matches);
  }

  async createMatche(req: Request, res: Response) {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
      inProgress } = req.body;
    console.log(req.body);
    const matche = await this._service.createMatche({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return res.status(201).json(matche);
  }
}

export default MatcheController;
