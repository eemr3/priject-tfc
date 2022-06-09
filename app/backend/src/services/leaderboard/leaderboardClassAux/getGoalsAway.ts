import TMatche from '../../types/type.matche';

export default class GoalsFavorAndOwnAway {
  getGoalsFavorAway = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => acc + matche.awayTeamGoals, 0);

  getGoalsOwnAway = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => acc + matche.homeTeamGoals, 0);
}
