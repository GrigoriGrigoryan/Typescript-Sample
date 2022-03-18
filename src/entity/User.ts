import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({type: "boolean", default: false})
	isActivated!: boolean;

	@Column()
	activationLink!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;
}