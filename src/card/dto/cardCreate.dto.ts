import {Entity} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

@Entity("card")
export class CardCreateDto {
	@ApiProperty()
	@IsString({message: "поле долно быть строкой"})
	@IsNotEmpty({message: "поле не дожно быть пустым"})
	title: string

	@ApiProperty()
	@IsString({message: "поле долно быть строкой"})
	@IsNotEmpty({message: "поле не дожно быть пустым"})
	description: string

	@ApiProperty()
	@IsNumber({}, {message: "поле должно быть числом"})
	@IsNotEmpty({message: "поле не дожно быть пустым"})
	columnId: number
}