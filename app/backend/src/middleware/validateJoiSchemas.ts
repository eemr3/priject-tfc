import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

class ValidateJoi {
  validate = (req: Request, res: Response, next: NextFunction, schemas: Schema) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    next();
  };
}

export default ValidateJoi;
