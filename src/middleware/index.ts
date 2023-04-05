import {Request, Response, NextFunction} from 'express';
import jwtdecoder, { JwtPayload } from 'jwt-decode';

import { TOKEN_NAME } from '../auth/JWT';

const getToken = (req: Request) => {
  const { cookie, authorization } = req.headers;

  if (cookie === undefined && authorization === undefined) {
    return undefined;
  }

  if (authorization !== undefined) {
    const token = authorization.split(' ')[1];

    if (token !== undefined) {
      return token;
    }
  }

  const value = `; ${cookie}`;
  const parts = value.split(`; ${TOKEN_NAME}=`);

  if (parts.length >= 2) {
    const cookie = parts.pop();
    if (cookie !== undefined) {
      return cookie.split(';').shift()
    }
  }
}

export const validateToken = (req: Request, res: Response, next: NextFunction ) => {
  const cookie = getToken(req);
  if (cookie === undefined) {
    res.status(401).json({});
    return
  }

  try {
    const token = jwtdecoder(cookie)

    if (typeof token === 'object' && token !== null && 'expiring' in token) {
      if (typeof token.expiring === 'number' && token.expiring > Date.now() / 1000) {
        next();
        return
      }
    }

    res.status(401).json({});
    return;
  } catch (err) {
    res.status(401).json({});
    return;
  }
}
