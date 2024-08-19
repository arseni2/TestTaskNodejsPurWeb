import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CommentCreateDto {
	@ApiProperty()
	@IsNotEmpty({message: "поле не должно быть путсым"})
	@IsString({message: "поле должно быть строкой"})
	content: string

	@ApiProperty()
	@IsNotEmpty({message: "поле не должно быть путсым"})
	@IsNumber({}, {message: "поле должно быть числом"})
	cardId: number
}