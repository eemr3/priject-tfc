import TMatche from '../../types/type.matche';

export default class TotalWinner {
  private _total: number;
  getTeamWinnerHome(matches: TMatche[]) {
    this._total = matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return this._total;
  }

  getTeamWinnerAway(matches: TMatche[]) {
    this._total = matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > matche.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return this._total;
  }
}
