import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth"
import { validationResult } from "express-validator";
import { HttpException } from "../exceptions/http-exception";


class AuthController {
	public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(HttpException.badRequest(`Error while validating`, errors.array()));
			}
			const { email, password } = req.body;
			const tokenPair = await authService.register(email, password);

			// !!!!    no need to set cookies if you send tokens with the response body
			// res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			res.status(201).json(tokenPair);
		}
		catch (e) {
			next(e);
		}
	};

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = req.body;
			const tokenPair = await authService.login(email, password);

			// !!!!    no need to set cookies if you send tokens with the response body
			// res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			res.json(tokenPair);
		} catch (e) {
			next(e);
		}
	};

	public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// const { refreshToken } = req.cookies;
			// !!! consider getting token with request body like so...

			const { refreshToken } = req.body;

			const token = authService.logout(refreshToken);
			// res.clearCookie('refreshToken');
			res.json(token)
		} catch (e) {
			next(e);
		}
	};

	public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// const { refreshToken } = req.cookies;
			// !!! consider getting token with request body like so...

			const { refreshToken } = req.body;

			const userData = await authService.refresh(refreshToken);
			res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	};

	public getUserId(req: Request, res: Response, next: NextFunction): void {
		const user = req.user;
		if(!user){
			return next(HttpException.unauthorizedError());
		}
		res.json({
			userId: user.id
		})
	};
}

export const authController = new AuthController();