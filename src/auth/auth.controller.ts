import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto} from "./dto/signIn.dto";
import {SignUpDto} from "./dto/signUp.dto";
import {ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {AuthGuard} from "./guards/auth.guard";
import {IUserFromRequest} from "../types";
import {UserEntity} from "../user/user.entity";

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {
	}

	@Post('signIn')
	@ApiUnauthorizedResponse({
		description: "Почта или пароль не правильный"
	})
	signIn(@Body() dto: SignInDto) {
		return this.authService.signIn(dto)
	}

	@Post('signUp')
	@ApiCreatedResponse({
		description: 'The record has been successfully created.',
	})
	@ApiConflictResponse({
		description: 'email уже используется',
	})
	signUp(@Body() dto: SignUpDto) {
		return this.authService.signUp(dto)
	}

	@ApiUnauthorizedResponse({
		description: "Вы не авторизованы"
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get("me")
	me(@Req() req: IUserFromRequest) {
		return req.user
	}

	@ApiHeader({
		name: 'refresh_token',
		description: 'Сюда нужно передать refresh_token который можно получить после SignIn или SignUp',
	})
	@ApiUnauthorizedResponse({
		description: "Вы не авторизованы"
	})
	@Post("refreshAccessToken")
	refreshAccessToken(@Req() req: Request) {
		return this.authService.refreshAccessToken(req.headers["refresh_token"])
	}
}
