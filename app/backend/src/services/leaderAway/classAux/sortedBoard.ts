import { TLedearBoard } from '../../types/type.leaderboard';

export default class SortedBoard {
  private _leaderBoardSort: TLedearBoard[];
  sortedBoard(leaderboard: TLedearBoard[]) {
    this._leaderBoardSort = leaderboard.sort(
      (teamA, teamB) =>
        teamB.totalPoints - teamA.totalPoints
        || teamB.totalVictories - teamA.totalVictories
        || teamB.goalsBalance - teamA.goalsBalance
        || teamB.goalsFavor - teamA.goalsFavor
        || teamB.goalsOwn - teamA.goalsOwn,
    );
    return this._leaderBoardSort;
  }
}
