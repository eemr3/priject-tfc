import * as express from 'express';
import Routes from './routes/Routes';

class App {
  public app: express.Express;
  public routers = new Routes();
  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);

    this.routers.login(this.app);
    this.routers.teams(this.app);
    this.routers.matches(this.app);
    this.routers.leaderboard(this.app);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`App listem on, port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
