// import BaseError from '../utils/errorBase';
import Team from '../database/models/team';
import TTeams from './types/type.teams';

class Teams {
  private _users: Team[];
  private _user: TTeams | null;

  async getAll() {
    this._users = await Team.findAll();
    return this._users;
  }

  async getById(id: number) {
    this._user = await Team.findOne({ where: { id } });
    // if (!this._user) throw new BaseError(404, 'There is no team with such id!');

    return this._user;
  }
}

export default Teams;
