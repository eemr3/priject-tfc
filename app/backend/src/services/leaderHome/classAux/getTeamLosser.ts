import TMatche from '../../types/type.matche';

export default class TeamLosser {
  getTeamLosser = (matches: TMatche[]): number =>
    matches.reduce((acc, matche) => {
      if (matche.homeTeamGoals < matche.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

  // getTeamLosser = (matches: TMatche[], option: string): number => {
  //   switch (option) {
  //     case 'away':
  //       this._result = matches.reduce((acc, matche) => {
  //         if (matche.awayTeamGoals > matche.homeTeamGoals) return acc + 1;
  //         return acc;
  //       }, 0);
  //       break;
  //     case 'home':
  //       this._result = matches.reduce((acc, matche) => {
  //         if (matche.homeTeamGoals > matche.awayTeamGoals) return acc + 1;
  //         return acc;
  //       }, 0);
  //       break;
  //     default:
  //       break;
  //   }
  //   return this._result;
  // };
}
