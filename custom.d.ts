import { UserDto } from "./src/dto/User";

declare global {
    namespace Express {
        export interface Request {
            user?: UserDto
        }
    }
}