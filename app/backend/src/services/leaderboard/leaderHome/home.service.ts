import Matche from '../../../database/models/matche';
import Team from '../../../database/models/team';
import GoalsFavorAndOwnHome from '../leaderboardClassAux/getGoalsHome';
import TotalWinner from '../leaderboardClassAux/getTotalTeamWinner';
import TotalLosser from '../leaderboardClassAux/getTotalTeamLosser';
import TeamDraws from '../leaderboardClassAux/getTeamDrawrs';
import SortedBoard from '../leaderboardClassAux/sortedBoard';
import { TLedearBoard } from '../../types/type.leaderboard';
import TMatche from '../../types/type.matche';

class LeaderboardHome {
  private _teamsMatche: TMatche[];
  private _teamsName: Team[];
  private _leaderBoard: TLedearBoard;
  private _leaderBoardSort: TLedearBoard[];
  private _totalWinner = new TotalWinner();
  private _totalLosser = new TotalLosser();
  private _getDraws = new TeamDraws();
  private _goalsTeam = new GoalsFavorAndOwnHome();
  private _sorted = new SortedBoard();

  private totalPoints(macthes: TMatche[]) {
    return (
      this._totalWinner.getTeamWinnerHome(macthes as TMatche[]) * 3
      + this._getDraws.getTeamDrawrs(macthes as TMatche[])
    );
  }

  private goalsBalance(macthes: TMatche[]) {
    return (
      this._goalsTeam.getGoalsFavorHome(macthes as TMatche[])
      - this._goalsTeam.getGoalsOwnHome(macthes as TMatche[])
    );
  }

  private efficiency(macthes: TMatche[]) {
    return Number(
      (
        ((this._totalWinner.getTeamWinnerHome(macthes as TMatche[]) * 3
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
      totalVictories: this._totalWinner.getTeamWinnerHome(macthes as TMatche[]),
      totalDraws: this._getDraws.getTeamDrawrs(macthes as TMatche[]),
      totalLosses: this._totalLosser.getTeamLosserHome(macthes as TMatche[]),
      goalsFavor: this._goalsTeam.getGoalsFavorHome(macthes as TMatche[]),
      goalsOwn: this._goalsTeam.getGoalsOwnHome(macthes as TMatche[]),
      goalsBalance: this.goalsBalance(macthes),
      efficiency: this.efficiency(macthes),
    };
    return this._leaderBoard;
  };

  private getHome(teams: Team[], matches: TMatche[]) {
    return teams.map((team) => {
      this._teamsMatche = matches.filter((matche) => team.id === matche.homeTeam);
      return this.createLeaderboard(team.teamName, this._teamsMatche);
    });
  }

  async getAllHome() {
    this._teamsMatche = await Matche.findAll({ where: { inProgress: false } });
    this._teamsName = await Team.findAll();
    this._leaderBoardSort = this.getHome(this._teamsName, this._teamsMatche);
    return this._sorted.sortedBoard(this._leaderBoardSort);
  }
}

export default LeaderboardHome;
