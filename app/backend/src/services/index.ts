import LeaderboardAway from './leaderboard/leaderAway/away.service';
import LeaderboardHome from './leaderboard/leaderHome/home.service';
import LeaderboardAll from './leaderboard/leaderboardAll/LeaderAll.service';

class Leaderboard {
  public awayBoard = new LeaderboardAway();
  public homeBoard = new LeaderboardHome();
  public leaderboardAll = new LeaderboardAll();
}

export default Leaderboard;
