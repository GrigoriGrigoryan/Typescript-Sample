export class HttpException extends Error {

	constructor(
		public status: number,
		message: string,
		public errors: any[] = []
	) {
		super(message);
	}

	public static unauthorizedError() {
		return new HttpException(401, `User not authorized`)
	}

	public static badRequest (message: string , errors: any [] = []) {
		return new HttpException(400, message, errors);
	}

	public static notFound (message: string) {
		return new HttpException(404, message);
	}

	public static internalServerError () {
		return new HttpException(500, "Something went wrong");
	}
}