import { createConnection } from "typeorm";

import { getApp } from "./app";
import { config, dbConnectionConfig } from "./config";


const  server = async () => {
	try {
		await createConnection(dbConnectionConfig)
		getApp().listen(config.port, () => {
			console.log(`Listening on port ${config.port}`)
		});
	}  catch (e) {
		console.log("Something went wrong while setting up the server")
		throw e;
	}
}

server();