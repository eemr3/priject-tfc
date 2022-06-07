// import newArryLB from '../utils/leaderboardUtil';
import Matche from '../database/models/matche';
import Team from '../database/models/team';
import { TLedearBoard } from './types/type.leaderboard';
import TMatche from './types/type.matche';

class LeaderboardService {
  private _teamsHome: Matche[];
  private _teamsName: Team[];
  private _resultMatche: TMatche[];
  private _leaderBoard: TLedearBoard;
  private _leaderBoardSort: TLedearBoard[];

  private async newArryTM(metcheArr: Array<Matche>) {
    this._resultMatche = metcheArr.reduce(
      (
        acc: Array<TMatche>,
        { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
      ) => {
        if (inProgress === false) {
          acc.push({ id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });
        }
        return acc;
      },
      [],
    );

    return this._resultMatche;
  }

  private async returnTeamsName() {
    this._teamsName = await Team.findAll();
    const names = this._teamsName.map((name) => name);
    return names;
  }

  private getTeamWinner = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private getTeamLosser = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals < matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private getTeamDrawrs = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals === matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

  private getGoalsFavor = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals > 0) {
        return acc + matche.homeTeamGoals;
      }
      return acc;
    }, 0);

  private getGoalsOwn = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.awayTeamGoals > 0) {
        return acc + matche.awayTeamGoals;
      }
      return acc;
    }, 0);

  private createLeaderboard = (teamName: string, macthes: TMatche[]) => {
    this._leaderBoard = {
      name: teamName,
      totalPoints: this.getTeamWinner(macthes as TMatche[]) * 3
        + this.getTeamDrawrs(macthes as TMatche[]),
      totalGames: macthes.length,
      totalVictories: this.getTeamWinner(macthes as TMatche[]),
      totalDraws: this.getTeamDrawrs(macthes as TMatche[]),
      totalLosses: this.getTeamLosser(macthes as TMatche[]),
      goalsFavor: this.getGoalsFavor(macthes as TMatche[]),
      goalsOwn: this.getGoalsOwn(macthes as TMatche[]),
      goalsBalance:
        this.getGoalsFavor(macthes as TMatche[]) - this.getGoalsOwn(macthes as TMatche[]),
      efficiency: Number((((this.getTeamWinner(macthes as TMatche[]) * 3
            + this.getTeamDrawrs(macthes as TMatche[])) / (macthes.length * 3))
          * 100).toFixed(2)),
    };
    return this._leaderBoard;
  };

  private getHome(teams: Team[], matches: TMatche[]) {
    return teams.map((team) => {
      this._resultMatche = matches.filter((matche) => team.id === matche.homeTeam);
      return this.createLeaderboard(team.teamName, this._resultMatche);
    });
  }

  private sortedBoard(leaderboard: TLedearBoard[]) {
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

  async getAllHome() {
    this._teamsHome = await Matche.findAll();
    this._resultMatche = await this.newArryTM(this._teamsHome);
    this._teamsName = await this.returnTeamsName();
    this._leaderBoardSort = this.getHome(this._teamsName, this._resultMatche);
    return this.sortedBoard(this._leaderBoardSort);
  }
}

export default LeaderboardService;
