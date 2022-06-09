import TMatche from '../../types/type.matche';

export default class TeamLosser {
  private _tatalLoasser: number;
  getTeamLosserHome = (matches: TMatche[]): number => {
    this._tatalLoasser = matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals < matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return this._tatalLoasser;
  };

  getTeamLosserAway = (matches: TMatche[]): number => {
    this._tatalLoasser = matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals < matche.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return this._tatalLoasser;
  };
}
