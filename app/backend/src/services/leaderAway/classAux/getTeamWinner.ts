import TMatche from '../../types/type.matche';

export default class TeamWinner {
  private n: number;
  getTeamWinner(matches: TMatche[]) {
    this.n = 3;
    return matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > matche.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
}
