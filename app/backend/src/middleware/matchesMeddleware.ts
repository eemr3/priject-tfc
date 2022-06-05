import { NextFunction, Request, Response } from 'express';
import Teams from '../services/Team.service';

class MatchesMeddleware {
  private _messageError =
  'It is not possible to create a match with two equal teams';

  private _serviceTeam = new Teams();
  async validateEqualTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const team1 = await this._serviceTeam.getById(homeTeam);
    const team2 = await this._serviceTeam.getById(awayTeam);

    if (team1?.teamName === team2?.teamName) {
      return res.status(401).json({ message: this._messageError });
    }

    if (!team1?.id || !team2?.id) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default MatchesMeddleware;
