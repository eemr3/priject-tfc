import Matche from '../../database/models/matche';
import Team from '../../database/models/team';
import GoalsFavor from './classAux/getGoalsFavor';
import GoalsOwn from './classAux/getGoalsOwn';
import TeamDraws from './classAux/getTeamDrawrs';
import TeamLosser from './classAux/getTeamLosser';
import TeamWinner from './classAux/getTeamWinner';
import SortedBoard from './classAux/sortedBoard';
import { TLedearBoard } from '../types/type.leaderboard';
import TMatche from '../types/type.matche';

class LeaderboardHome {
  private _teamsMatche: TMatche[];
  private _teamsName: Team[];
  private _leaderBoard: TLedearBoard;
  private _leaderBoardSort: TLedearBoard[];
  private _getWinner = new TeamWinner();
  private _getLosser = new TeamLosser();
  private _getDraws = new TeamDraws();
  private _goalsFavor = new GoalsFavor();
  private _goalsOwn = new GoalsOwn();
  private _sorted = new SortedBoard();

  private totalPoints(macthes: TMatche[]) {
    return (
      this._getWinner.getTeamWinner(macthes as TMatche[]) * 3
      + this._getDraws.getTeamDrawrs(macthes as TMatche[])
    );
  }

  private goalsBalance(macthes: TMatche[]) {
    return (
      this._goalsFavor.getGoalsFavor(macthes as TMatche[])
      - this._goalsOwn.getGoalsOwn(macthes as TMatche[])
    );
  }

  private efficiency(macthes: TMatche[]) {
    return Number(
      (
        ((this._getWinner.getTeamWinner(macthes as TMatche[]) * 3
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
      totalVictories: this._getWinner.getTeamWinner(macthes as TMatche[]),
      totalDraws: this._getDraws.getTeamDrawrs(macthes as TMatche[]),
      totalLosses: this._getLosser.getTeamLosser(macthes as TMatche[]),
      goalsFavor: this._goalsFavor.getGoalsFavor(macthes as TMatche[]),
      goalsOwn: this._goalsOwn.getGoalsOwn(macthes as TMatche[]),
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

  private getAway(teams: Team[], matches: TMatche[]) {
    return teams.map((team) => {
      this._teamsMatche = matches.filter((matche) => team.id === matche.awayTeam);
      return this.createLeaderboard(team.teamName, this._teamsMatche);
    });
  }

  async getAllHome() {
    this._teamsMatche = await Matche.findAll({ where: { inProgress: false } });
    this._teamsName = await Team.findAll();
    this._leaderBoardSort = this.getHome(this._teamsName, this._teamsMatche);
    return this._sorted.sortedBoard(this._leaderBoardSort);
  }

  async getAllAway() {
    this._teamsMatche = await Matche.findAll({ where: { inProgress: false } });
    this._teamsName = await Team.findAll();
    this._leaderBoardSort = this.getAway(this._teamsName, this._teamsMatche);
    return this._sorted.sortedBoard(this._leaderBoardSort);
  }
}

export default LeaderboardHome;
