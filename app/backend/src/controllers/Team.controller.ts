import { Request, Response } from 'express';
import BaseError from '../utils/errorBase';
import Teams from '../services/Team.service';

class TeamController {
  private _controller = new Teams();

  async getAll(req: Request, res: Response) {
    const teams = await this._controller.getAll();

    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this._controller.getById(Number(id));
      return res.status(200).json(user);
    } catch (error) {
      return res.status((error as BaseError).status).json({ message: (error as Error).message });
    }
  }
}

export default TeamController;
