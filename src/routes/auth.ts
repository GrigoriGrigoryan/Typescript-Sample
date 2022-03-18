import { Router } from "express";
import { body } from "express-validator";

import { authController } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";


export const registerRouter = Router();

registerRouter
	.post('/signin',  authController.login)
	.post('/signin/new_token', authMiddleware, authController.refresh)
	.post('/signup',
		body('email').isEmail(),
		body('password').isLength({min: 3, max: 32}),
		authController.register)
	.get('/info', authController.getUserId)
	.get('/logout', authController.logout)
