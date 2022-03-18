import { DeleteResult, getRepository } from "typeorm";
import * as bcrypt from "password-hash";
import * as uuid from "uuid";

import  { User} from "../entity/User";
import { mailService } from "./mail";
import { tokenService } from "./token";
import { UserDto } from "../dto/User";
import { HttpException } from "../exceptions/http-exception";
import { Token } from "../entity/Token";
import {config} from "../config";


class AuthService {
	public async register(email: string, password: string): Promise<{accessToken: string, refreshToken: string}> {
		const userWithEmail = await getRepository(User).findOne({ email });
		if (userWithEmail) {
			throw HttpException.badRequest(`Email already in use`);
		}

		const hashPassword =  bcrypt.generate(password);

		const user = getRepository(User).create({ email, password: hashPassword });
		await getRepository(User).save(user);

		const userDto = new UserDto(user);
		const tokenPair = tokenService.generateTokens(userDto);
		await tokenService.saveToken(userDto.id, tokenPair.refreshToken);

		return tokenPair;
	}

	async login(email: string, password: string):  Promise<{accessToken: string, refreshToken: string}> {
		const user = await getRepository(User).findOne({email});
		if (!user) {
			throw HttpException.badRequest(`Invalid email or password`)
		}
		const isPassEquals =  bcrypt.verify(password, user.password);
		if (!isPassEquals) {
			throw HttpException.badRequest(`Invalid email or password`)
		}
		const userDto = new UserDto(user);
		const tokenPair = tokenService.generateTokens(userDto);
		await tokenService.saveToken(userDto.id, tokenPair.refreshToken);

		return tokenPair;
	}

	public async logout(refreshToken: string): Promise<DeleteResult> {
		return  tokenService.removeToken(refreshToken);
	}

	public async refresh( refreshToken: string ): Promise<{accessToken: string, refreshToken: string} | undefined> {
		if (!refreshToken) {
			throw HttpException.unauthorizedError();
		}
		const  userData = await tokenService.validateToken(refreshToken, config.jwtRefreshSecret);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw HttpException.unauthorizedError();
		}

		const user = await getRepository(User).findOne(tokenFromDb.id);
		if(!user) {
			throw HttpException.notFound("User not found");
		}

		const userDto = new UserDto(user);
		const tokenPair = tokenService.generateTokens(userDto);
		await tokenService.saveToken(userDto.id, tokenPair.refreshToken);

		return tokenPair;
	}
}

export const authService  = new AuthService();