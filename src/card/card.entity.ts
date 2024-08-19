import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ColumnEntity } from "../column/column.entity";
import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "../comment/comment.entity";
import { forwardRef } from "@nestjs/common";

@Entity("card")
export class CardEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	userId: number;

	@ManyToOne(() => UserEntity, (user) => user.cards)
	user: UserEntity;

	@Column()
	columnId: number;

	@ManyToOne(() => ColumnEntity, (column) => column.cards)
	column: ColumnEntity;

	@OneToMany(() => CommentEntity, (comment) => comment.card)
	comments: CommentEntity[];

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
