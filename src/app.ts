import express, { Express } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { registerRouter } from "./routes/auth";
import { fileRouter } from "./routes/file";
import { errorMiddleware } from "./middleware/error"
import { routeNotFoundMiddleware } from "./middleware/routeNotFound";
import {authMiddleware} from "./middleware/auth";


export const getApp = (): Express => (
	express()
			.use(express.json())
			.use(cookieParser())
			.use(cors())
			.use(morgan('tiny'))
			.use('/api', registerRouter)
			.use('/file', authMiddleware, fileRouter)
			.use(compression())
			.use(routeNotFoundMiddleware)
			.use(errorMiddleware)
);