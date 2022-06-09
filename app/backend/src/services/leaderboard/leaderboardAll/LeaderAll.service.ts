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
    this._leaderBoard = home.map((Lhome: TLedearBoard) =>
      away.reduce((acc: TLedearBoard, Laway: TLedearBoard) => {
        if (Lhome.name === Laway.name) {
          acc.name = Lhome.name;
          acc.totalPoints = Lhome.totalPoints + Laway.totalPoints;
          acc.totalGames = Lhome.totalGames + Laway.totalGames;
          acc.totalVictories = Lhome.totalVictories + Laway.totalVictories;
          acc.totalDraws = Lhome.totalDraws + Laway.totalDraws;
          acc.totalLosses = Lhome.totalLosses + Laway.totalLosses;
          acc.goalsFavor = Lhome.goalsFavor + Laway.goalsFavor;
          acc.goalsOwn = Lhome.goalsOwn + Laway.goalsOwn;
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
