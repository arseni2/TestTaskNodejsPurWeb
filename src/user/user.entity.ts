import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ColumnEntity} from "../column/column.entity";
import {CardEntity} from "../card/card.entity";
import {CommentEntity} from "../comment/comment.entity";

@Entity("user")
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({unique: true})
	email: string

	@Column({unique: true})
	password: string

	@OneToMany(() => ColumnEntity, (column) => column.user)
	columns: ColumnEntity[]

	@OneToMany(() => CardEntity, (card) => card.user)
	cards: CardEntity[]

	@OneToMany(() => CommentEntity, (comment) => comment.user)
	comments: CommentEntity[]

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;
	
	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}