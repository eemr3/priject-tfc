import { Request, Response } from 'express';
import Leaderboard from '../services';

class LeaderboardController {
  private _service = new Leaderboard();
  async getAllHome(_req: Request, res: Response) {
    const leaderHome = await this._service.homeBoard.getAllHome();

    return res.status(200).json(leaderHome);
  }

  async getAllAway(_req: Request, res: Response) {
    const leaderAway = await this._service.awayBoard.getAllAway();
    return res.status(200).json(leaderAway);
  }

  async getLeaderboardAll(_req: Request, res: Response) {
    const leaderboard = await this._service.leaderboardAll.getAll();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
