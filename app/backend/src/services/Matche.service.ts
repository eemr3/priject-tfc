import Team from '../database/models/team';
import Matche from '../database/models/matche';
import TMatche from './types/type.matche';
import BaseError from '../utils/errorBase';

class MatcheService {
  private _matches: Matche[];
  private _matche: Matche;
  private _errorMessage: 'Matche not found';
  private _resultIP: [number, Matche[]];

  async getAll(inrogress: string) {
    if (inrogress) {
      this._matches = await Matche.findAll({
        where: { inProgress: inrogress === 'true' },
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
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = dataMatche;
    this._matche = await Matche.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return this._matche;
  }

  async updateInProgress(id: number) {
    this._resultIP = await Matche.update({ inProgress: false }, { where: { id } });

    return false;
  }

  async updateMatches(id: number, homeTeamGoals: string, awayTeamGoals: string) {
    const matcheExist = await Matche.findOne({ where: { id } });
    if (!matcheExist) throw new BaseError(400, this._errorMessage);

    await Matche.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { message: 'Match auterated successfully' };
  }
}

export default MatcheService;
