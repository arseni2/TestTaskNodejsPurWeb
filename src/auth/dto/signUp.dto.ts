import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class SignUpDto {
	@ApiProperty({title: "email"})
	@IsEmail({}, {message: "не валидный email"})
	@Matches(
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		{ message: "Email должен содержать '@' и доменное имя" }
	)
	@IsString({ message: 'поле должно быть строкой' })
	@IsNotEmpty({ message: 'поле не должно быть пустым' })
	email: string

	@ApiProperty({title: "password"})
	@IsString({ message: 'поле должно быть строкой' })
	@IsNotEmpty({ message: 'поле не должно быть пустым' })
	@MinLength(6,{message: "пароль должен быть от 6 символов"})
	password: string
}