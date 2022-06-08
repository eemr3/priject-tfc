import TMatche from '../../types/type.matche';

export default class TeamDraws {
  getTeamDrawrs = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals === matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
}
