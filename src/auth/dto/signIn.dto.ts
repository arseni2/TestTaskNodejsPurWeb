import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, MinLength} from "class-validator";

export class SignInDto {
	@ApiProperty({title: "email"})
	@IsEmail({}, {message: "не валидный email"})
	email: string

	@ApiProperty({title: "password"})
	@MinLength(6,{message: "пароль должен быть от 6 символов"})
	password: string
}