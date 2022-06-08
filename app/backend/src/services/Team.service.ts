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

    return this._user;
  }
}

export default Teams;
