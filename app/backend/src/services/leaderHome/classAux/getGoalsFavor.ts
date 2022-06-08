import TMatche from '../../types/type.matche';

export default class GoalsFavor {
  getGoalsFavor = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > 0) {
        return acc + matche.homeTeamGoals;
      }
      return acc;
    }, 0);
}
