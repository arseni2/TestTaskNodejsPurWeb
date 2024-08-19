import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, MinLength} from "class-validator";

export class UserCreateDto {
	@ApiProperty()
	@IsEmail({}, {message: "email не валидный"})
	email: string;

	@ApiProperty()
	@MinLength(6, {message: "пароль от 6 символов"})
	password: string;
}