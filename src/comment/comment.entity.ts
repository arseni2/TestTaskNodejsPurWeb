import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {CardEntity} from "../card/card.entity";
import {UserEntity} from "../user/user.entity";
import {forwardRef} from "@nestjs/common";

@Entity("comment")
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	content: string

	@Column()
	cardId: number


	@ManyToOne(() => CardEntity, (card) => card.comments)
	card: CardEntity

	@ManyToOne(() => UserEntity, (user) => user.comments)
	user: UserEntity

	@Column()
	userId: number

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}