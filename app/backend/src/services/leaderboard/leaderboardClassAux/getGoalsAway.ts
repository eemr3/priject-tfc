import TMatche from '../../types/type.matche';

export default class GoalsFavorAndOwnAway {
  getGoalsFavorAway = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > 0) {
        return acc + matche.awayTeamGoals;
      }
      return acc;
    }, 0);

  getGoalsOwnAway = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > 0) {
        return acc + matche.homeTeamGoals;
      }
      return acc;
    }, 0);
}
