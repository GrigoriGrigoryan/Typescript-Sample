import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	refreshToken!: string;

	@Column({type: "number"})
	user_id!: number;

	@OneToOne(() => User)
	@JoinColumn({name: "user_id"})
	user!: User
}