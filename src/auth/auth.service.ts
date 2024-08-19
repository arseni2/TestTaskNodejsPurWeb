import {BadRequestException, ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {SignInDto} from "./dto/signIn.dto";
import {SignUpDto} from "./dto/signUp.dto";
import {UserEntity} from "../user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {hash, verify} from "argon2";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly tokenService: TokenService
	) {
	}

	async generateToken(user: UserEntity) {
		const payload = { id: user.id };
		const token = await this.jwtService.signAsync(payload);
		return { token };
	}

	private validRefreshToken(expire: Date) {
		return new Date() <= new Date(expire);
	}

	async refreshAccessToken(refresh_token: string) {
		if (!refresh_token) throw new UnauthorizedException('Вы не авторизованы!');

		const userRefreshToken = await this.tokenService.findOneRefreshToken(
			refresh_token,
		);

		const isValid = this.validRefreshToken(userRefreshToken.expire);

		if (!userRefreshToken && !isValid) {
			throw new UnauthorizedException('Вы не авторизованы!');
		}

		const user = await this.userService.findOneById(userRefreshToken.user.id);

		const {token} = await this.generateToken(user);

		return {access_token: token};
	}

	async signIn(dto: SignInDto) {
		const user = await this.userService.findOneByEmail(dto.email)
		if(!user) throw new UnauthorizedException("Почта или пароль не правильный")
		const passwordEquals = await verify(
			user.password,
			dto.password
		);
		console.log(passwordEquals)
		if( !passwordEquals ) throw new UnauthorizedException("Почта или пароль не правильный")
		const { token } = await this.generateToken(user);

		const currentRefreshToken = await this.tokenService.findOneUserID(
			user.id,
		);

		return {
			access_token: token,
			refresh_token: currentRefreshToken.refresh_token,
			user
		}
	}

	async signUp(dto: SignUpDto) {
		const newUser = this.userService.create(dto)

		const user = await this.userService.findOneByEmail(dto.email)
		if(user) throw new ConflictException("email уже используется")

		newUser.password = await hash(dto.password)
		await this.userService.save(newUser)

		const { token } = await this.generateToken(newUser);

		//FIX: name variable
		const data = await this.tokenService.generateRefreshToken(
			newUser.id,
		);

		await this.tokenService.create(data)

		return {
			user: newUser,
			access_token: token,
			refresh_token: data.refresh_token
		}
	}
}
