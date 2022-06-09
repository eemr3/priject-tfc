// import Matche from '../../../database/models/matche';
import { TLedearBoard } from '../../types/type.leaderboard';
import LeaderboardAway from '../leaderAway/away.service';
import SortedBoard from '../leaderboardClassAux/sortedBoard';
import LeaderboardHome from '../leaderHome/home.service';

class LeaderboardAll {
  private _leaderBoard: TLedearBoard[];
  private _leaderBoardSort = new SortedBoard();
  private _leaderHome = new LeaderboardHome();
  private _leaderAway = new LeaderboardAway();

  private getTeamsMatches(home: TLedearBoard[], away: TLedearBoard[]) {
    this._leaderBoard = home.map((LHome: TLedearBoard) =>
      away.reduce((acc: TLedearBoard, LAway: TLedearBoard) => {
        if (LHome.name === LAway.name) {
          acc.name = LHome.name;
          acc.totalPoints = LHome.totalPoints + LAway.totalPoints;
          acc.totalGames = LHome.totalGames + LAway.totalGames;
          acc.totalVictories = LHome.totalVictories + LAway.totalVictories;
          acc.totalDraws = LHome.totalDraws + LAway.totalDraws;
          acc.totalLosses = LHome.totalLosses + LAway.totalLosses;
          acc.goalsFavor = LHome.goalsFavor + LAway.goalsFavor;
          acc.goalsOwn = LHome.goalsOwn + LAway.goalsOwn;
          acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
          acc.efficiency = Number((((acc.totalVictories * 3 + acc.totalDraws)
            / (acc.totalGames * 3)) * 100).toFixed(2));
        }
        return acc;
      }, {} as TLedearBoard));
    return this._leaderBoard;
  }

  async getAll() {
    const home = await this._leaderHome.getAllHome();
    const away = await this._leaderAway.getAllAway();
    const result = this.getTeamsMatches(home, away);
    const classifcation = this._leaderBoardSort.sortedBoard(result);
    return classifcation;
  }
}

export default LeaderboardAll;
