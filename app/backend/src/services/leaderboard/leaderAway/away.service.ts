import Matche from '../../../database/models/matche';
import Team from '../../../database/models/team';
import GoalsFavorAndOwnAway from '../leaderboardClassAux/getGoalsAway';
import TotalWinner from '../leaderboardClassAux/getTotalTeamWinner';
import TotalLosser from '../leaderboardClassAux/getTotalTeamLosser';
import TeamDraws from '../leaderboardClassAux/getTeamDrawrs';
import SortedBoard from '../leaderboardClassAux/sortedBoard';

import { TLedearBoard } from '../../types/type.leaderboard';
import TMatche from '../../types/type.matche';

class LeaderboardAway {
  private _teamsMatche: TMatche[];
  private _teamsName: Team[];
  private _leaderBoard: TLedearBoard;
  private _leaderBoardSort: TLedearBoard[];
  private _getWinner = new TotalWinner();
  private _getLosser = new TotalLosser();
  private _getDraws = new TeamDraws();
  private _goals = new GoalsFavorAndOwnAway();
  private _sorted = new SortedBoard();

  private totalPoints(macthes: TMatche[]) {
    return (
      this._getWinner.getTeamWinnerAway(macthes as TMatche[]) * 3
      + this._getDraws.getTeamDrawrs(macthes as TMatche[])
    );
  }

  private goalsBalance(macthes: TMatche[]) {
    return (
      this._goals.getGoalsFavorAway(macthes as TMatche[])
      - this._goals.getGoalsOwnAway(macthes as TMatche[])
    );
  }

  private efficiency(macthes: TMatche[]) {
    return Number(
      (
        ((this._getWinner.getTeamWinnerAway(macthes as TMatche[]) * 3
          + this._getDraws.getTeamDrawrs(macthes as TMatche[]))
          / (macthes.length * 3))
        * 100
      ).toFixed(2),
    );
  }

  private createLeaderboard = (teamName: string, macthes: TMatche[]) => {
    this._leaderBoard = {
      name: teamName,
      totalPoints: this.totalPoints(macthes),
      totalGames: macthes.length,
      totalVictories: this._getWinner.getTeamWinnerAway(macthes as TMatche[]),
      totalDraws: this._getDraws.getTeamDrawrs(macthes as TMatche[]),
      totalLosses: this._getLosser.getTeamLosserAway(macthes as TMatche[]),
      goalsFavor: this._goals.getGoalsFavorAway(macthes as TMatche[]),
      goalsOwn: this._goals.getGoalsOwnAway(macthes as TMatche[]),
      goalsBalance: this.goalsBalance(macthes),
      efficiency: this.efficiency(macthes),
    };
    return this._leaderBoard;
  };

  private getAway(teams: Team[], matches: TMatche[]) {
    return teams.map((team) => {
      this._teamsMatche = matches.filter((matche) => team.id === matche.awayTeam);
      return this.createLeaderboard(team.teamName, this._teamsMatche);
    });
  }

  async getAllAway() {
    this._teamsMatche = await Matche.findAll({ where: { inProgress: false } });
    this._teamsName = await Team.findAll();
    this._leaderBoardSort = this.getAway(this._teamsName, this._teamsMatche);
    return this._sorted.sortedBoard(this._leaderBoardSort);
  }
}

export default LeaderboardAway;
