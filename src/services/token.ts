import { DeleteResult, getConnection, getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

import { Token } from "../entity/Token";
import { config } from "../config";


class TokenService {
	 public generateTokens(payload: string | Buffer | object): {accessToken: string, refreshToken: string} {

		const accessToken = jwt.sign(payload,config.jwtAccessSecret,  { expiresIn: config.accessTokenExp });
		const refreshToken = jwt.sign(payload,config.jwtRefreshSecret,  { expiresIn: config.refreshTokenExp });
		return {
			accessToken,
			refreshToken
		}
	}

	public async saveToken(userId: number, refreshToken: string): Promise<Token> {
		const tokenData = await getRepository(Token).findOne({user_id: userId});
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			// await getRepository(Token).save(tokenData);
		}
		const token = await getRepository(Token).create({user_id: userId, refreshToken});
		await getRepository(Token).save(token);
		return token;
	}

	public async removeToken (refreshToken: string): Promise<DeleteResult> {
		return await getConnection()
			.createQueryBuilder()
			.update(Token)
			.delete()
			.where({ refreshToken: refreshToken })
			.execute();
	}

	public async validateToken(token: string, secret: Secret): Promise<string | jwt.JwtPayload | null> {
		 try {
			 return jwt.verify(token, secret);
		 } catch (e) {
			 return null;
		 }
	}

	public async findToken (refreshToken: string): Promise<Token | undefined> {
		return await getRepository(Token).findOne({ refreshToken: refreshToken });
	}
}


export const tokenService = new TokenService();