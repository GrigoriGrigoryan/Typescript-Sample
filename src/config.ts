import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

import { User } from "./entity/User";
import { Token } from "./entity/Token";

dotenv.config();

export const dbConnectionConfig: ConnectionOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number(process.env.POSTGRES_PORT) || 5432,
	username: process.env.POSTGRES_USERNAME || "postgres",
	password: process.env.POSTGRES_PASSWORD || "postgres",
	database: process.env.POSTGRES_DB || "pg_data",
	entities: [User, Token],
	migrations: [],
	cli: {},
	logging: true,
	synchronize: true,
}

export const config = {
	port: Number(process.env.POSTGRES_PORT) || 8080,
	jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "",
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
	accessTokenExp: process.env.ACCESS_TOKEN_EXP,
	refreshTokenExp: process.env.REFRESH_TOKEN_EXP,
}
