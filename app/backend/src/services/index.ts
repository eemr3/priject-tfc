import LeaderboardSAway from './leaderAway/away.service';
import LeaderboardHome from './leaderHome/home.service';

class Leaderboard {
  public awayBoard = new LeaderboardSAway();
  public homeBoard = new LeaderboardHome();
}

export default Leaderboard;
