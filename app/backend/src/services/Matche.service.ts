import Team from '../database/models/team';
import Matche from '../database/models/matche';

class MatcheService {
  private _matches: Matche[];

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
}

export default MatcheService;
