import TMatche from '../../types/type.matche';

export default class GoalsFavorAndOwnHome {
  getGoalsFavorHome = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => acc + matche.homeTeamGoals, 0);

  getGoalsOwnHome = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => acc + matche.awayTeamGoals, 0);
}
