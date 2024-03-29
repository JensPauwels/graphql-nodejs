import {type Response} from 'express';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

export const TOKEN_NAME = 'GRAPHQL_TOKEN';
const TOKEN_HASH = 'Dit_is-een!secret@key#vo-0rGr@pHQ|';

class JWT {
	// SetToken sets the signed JWT token as a cookie
	setToken = (res: Response, tokenData: Record<string, any>) => {
		const oneWeek = 7 * 24 * 3600 * 1000;

		const tokenBody = {
			expiring: dayjs().add(7, 'd').unix(),
			...tokenData,
		};

		const token = jwt.sign(tokenBody, TOKEN_HASH);

		res.cookie(TOKEN_NAME, token, {
			domain: 'graphql.local',
			maxAge: oneWeek,
			expires: new Date(Date.now() + oneWeek),
		});
	};

	// SetExpiredCookie overwrites the current token with an expired token, this is a hack to
	// remove the current token
	setExpiredCookie = (res: Response) => {
		const tokenBody = {
			authenticated: false,
			expiring: Date.now(),
		};

		const token = jwt.sign(tokenBody, TOKEN_HASH);

		res.cookie(TOKEN_NAME, token, {
			domain: 'localhost',
			maxAge: 0,
		});
	};
}

export default new JWT();
