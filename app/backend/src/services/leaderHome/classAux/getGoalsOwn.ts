import TMatche from '../../types/type.matche';

export default class GoalsOwn {
  getGoalsOwn = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > 0) {
        return acc + matche.awayTeamGoals;
      }
      return acc;
    }, 0);
}
