import {type Request, type Response, type NextFunction} from 'express';
import jwtdecoder from 'jwt-decode';

import {TOKEN_NAME} from '../auth/JWT';

type IToken = {
  expiring: number;
  author_id: string;
};

export class Token {
  expiring: number;
  authorID: string;

  constructor(data?: IToken) {
    this.expiring = data?.expiring ?? Date.now() / 1000;
    this.authorID = data?.author_id ?? '';
  }
}

const getToken = (req: Request) => {
	const {cookie, authorization} = req.headers;

	if (cookie === undefined && authorization === undefined) {
		return undefined;
	}

	if (authorization !== undefined) {
		const token = authorization.split(' ')[1];

		if (token !== undefined) {
			return token;
		}
	}

	if (cookie === undefined) {
		return undefined;
	}

	const value = `; ${cookie}`;
	const parts = value.split(`; ${TOKEN_NAME}=`);

	if (parts.length >= 2) {
		const cookie = parts.pop();
		if (cookie !== undefined) {
			return cookie.split(';').shift();
		}
	}
};

type CustomRequest = {
 token: Token;
} & Request;

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const cookie = getToken(req);
	if (cookie === undefined) {
		res.status(401).json({});
		return;
	}

	try {
		const token = jwtdecoder(cookie);

		if (typeof token === 'object' && token !== null && 'expiring' in token && 'author_id' in token) {
			if (typeof token.expiring === 'number' && typeof token.author_id === 'string' && token.expiring > Date.now() / 1000) {
        const newToken = new Token();

        newToken.expiring = token.expiring;
        newToken.authorID = token.author_id;

        (req as CustomRequest).token = newToken;
				next();
				return;
			}
		}

		res.status(401).json({});
		return;
	} catch (err) {
		res.status(401).json({});
	}
};

