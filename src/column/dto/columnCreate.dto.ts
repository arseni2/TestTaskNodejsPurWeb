import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class ColumnCreateDto {
	@ApiProperty()
	@IsNotEmpty({message: "title не может быть пустым"})
	title: string
}