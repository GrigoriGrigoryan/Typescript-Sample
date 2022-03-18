import { HttpException } from "../exceptions/http-exception";
import { Request, Response } from "express";

export function routeNotFoundMiddleware (req: Request, res: Response): void {

    const error = HttpException.notFound("Route not found");
    res.status(error.status).json(error);
}