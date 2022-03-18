import {User} from "../entity/User";

export class UserDto {
	email: string;
	id;
	isActivated: Boolean;

	constructor(model: User) {
		this.email = model.email;
		this.id = model.id;
		this.isActivated = model.isActivated;
	}
}