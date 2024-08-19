import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity("token")
export class TokenEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'timestamp' })
	expire: Date;

	@Column()
	refresh_token: string;

	@Column()
	userId: number;

	@OneToOne(() => UserEntity)
	@JoinColumn()
	user: UserEntity;
}