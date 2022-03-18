import { Router } from "express";

export const fileRouter = Router();

fileRouter
	.post('/upload')
	.get('/list')
	.delete('/delete/:id')
	.get('/:id')
	.get('/download/:id')
	.put('/update/:id')
