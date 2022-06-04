import Team from '../database/models/team';
import Matche from '../database/models/matche';
import TMatche from './types/type.matche';

class MatcheService {
  private _matches: Matche[];
  private _matche: Matche;
  async getAll(inProgress: boolean) {
    if (inProgress) {
      this._matches = await Matche.findAll({
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return this._matches;
    }
    this._matches = await Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  }

  async createMatche(dataMatche: TMatche) {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    } = dataMatche;
    this._matche = await Matche.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    return this._matche;
  }
}

export default MatcheService;
