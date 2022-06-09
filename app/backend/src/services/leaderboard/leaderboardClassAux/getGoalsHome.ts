import TMatche from '../../types/type.matche';

export default class GoalsFavorAndOwnHome {
  getGoalsFavorHome = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > 0) {
        return acc + matche.homeTeamGoals;
      }
      return acc;
    }, 0);

  getGoalsOwnHome = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > 0) {
        return acc + matche.awayTeamGoals;
      }
      return acc;
    }, 0);
}
