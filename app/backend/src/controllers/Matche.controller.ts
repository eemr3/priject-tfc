import { Request, Response } from 'express';
import MatcheService from '../services/Matche.service';

class MatcheController {
  private _service = new MatcheService();
  private _inprogress:boolean;
  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    this._inprogress = inProgress === 'true';
    const matches = await this._service.getAll(this._inprogress);

    return res.status(200).json(matches);
  };
}

export default MatcheController;
