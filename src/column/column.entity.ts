import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { CardEntity } from "../card/card.entity";
import { forwardRef } from "@nestjs/common";

@Entity("column")
export class ColumnEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	userId: number;

	@ManyToOne(() => UserEntity, (user) => user.columns)
	user: UserEntity;

	@OneToMany(() => CardEntity, (card) => card.column, { nullable: true })
	cards: CardEntity[];

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
