import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

class Leaderboard {
  private _service = new LeaderboardService();

  async getAllHome(_req: Request, res: Response) {
    const leaderHome = await this._service.getAllHome();

    return res.status(200).json(leaderHome);
  }
}

export default Leaderboard;
