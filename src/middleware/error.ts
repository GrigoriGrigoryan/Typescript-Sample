import {HttpException} from "../exceptions/http-exception";
import {NextFunction, Request, Response} from "express";

export function errorMiddleware (err: any, req: Request, res: Response, next: NextFunction): any {
	if (err instanceof HttpException) {
		return res.status(err.status).json(err);
	}
	const internalErr = HttpException.internalServerError();
	return  res.status(internalErr.status).json(internalErr);
}