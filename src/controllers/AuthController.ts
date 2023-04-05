import { Request, Response } from 'express';
import Joi from 'joi';

import { AdminDao } from '../db/';
import { Bcrypt, JWT } from '../auth';
import { Admin } from '../models';
import handleError from '../error';

const isSchemaValid = (req: Request, res: Response, schema: Joi.ObjectSchema): boolean => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ 
      error: error.details[0].message,
    });

    return false
  }

  return true
}

class AuthController {
  register = async (req: Request, res: Response) => {
    const schema = Joi.object({
      email: Joi.string().min(8).required(),
      password: Joi.string().min(8).required(),
    });

    if (!isSchemaValid(req, res, schema)) {
      return
    }

    try {
      const { email, password } = req.body;

      const emailInUse = await AdminDao.exists(email);
      if (emailInUse) {
        res.status(409).json({});
        return
      }

      const hashedPassword = await Bcrypt.hash(password);

      const admin = new Admin({
        email,
        password: hashedPassword,
      });

      await AdminDao.insert(admin);

      res.status(200).json({});
    } catch (error) {
      handleError(res, error)
    }
  };

  login = async (req: Request, res: Response) => {
    const schema = Joi.object({
      email: Joi.string().min(8).required(),
      password: Joi.string().min(8).required(),
    });

    if (!isSchemaValid(req, res, schema)) {
      return
    }

    const { email, password } = req.body;

    try {
      const admin = await AdminDao.getByEmail(email);
      const isValid = await Bcrypt.isValid(password, admin.password)

      if (!isValid) {
        res.status(401).json({});
        return
      }

      JWT.setToken(res, {
        authorized: true
      });

      res.status(200).json({});
    } catch (error) {
      handleError(res, error)
    }
  };

  logout = (req: Request, res: Response) => {
    res.status(501).json({});
  };
};

export default new AuthController();
