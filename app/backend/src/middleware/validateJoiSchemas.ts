import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

class ValidateJoi {
  validate = (req: Request, res: Response, next: NextFunction, schemas: Schema) => {
    const { error } = schemas.validate(req.body);

    if (error?.details[0].type === 'string.email') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
}

export default ValidateJoi;
