import TMatche from '../../types/type.matche';

export default class TeamLosser {
  getTeamLosser = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals < matche.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
}
