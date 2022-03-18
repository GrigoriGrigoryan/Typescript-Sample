import { NextFunction, Request, Response } from "express";

import { HttpException } from "../exceptions/http-exception";
import { tokenService }  from "../services/token";
import { config } from "../config";
import { UserDto } from "../dto/User";


export async function authMiddleware ( req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				return next(HttpException.unauthorizedError());
			}

			const accessToken = authorizationHeader.split(' ')[1];
			if(!accessToken) {
				return next(HttpException.unauthorizedError());
			}

			const userData = await tokenService.validateToken(accessToken, config.jwtAccessSecret);
			if (!userData) {
				return next(HttpException.unauthorizedError());
			}

			req.user = (userData as UserDto);
			next();
		} catch (e) {
			return next(e);
		}
}