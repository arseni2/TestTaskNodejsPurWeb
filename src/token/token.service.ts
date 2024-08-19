import { Injectable } from '@nestjs/common';
import {TokenEntity} from "./token.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TokenCreateDto} from "./dto/tokenCreate.dto";
import { v4 } from 'uuid';
import {addMonths} from "date-fns";

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(TokenEntity)
		private readonly tokenRepository: Repository<TokenEntity>,
	) {}

	async create(createTokenDto: TokenCreateDto) {
		return await this.tokenRepository.save({ ...createTokenDto });
	}

	async findOneUserID(userId: number) {
		return await this.tokenRepository.findOne({ where: { user: {id: userId} }, relations: ["user"]});
	}

	async findOneRefreshToken(refresh_token: string) {
		return await this.tokenRepository.findOne({ where: { refresh_token }, relations: ["user"] });
	}

	async update(id: number, dto: TokenCreateDto) {
		return await this.tokenRepository.update({ id }, { ...dto });
	}

	async remove(id: number) {
		return await this.tokenRepository.delete({ id });
	}

	async generateRefreshToken(userId: number): Promise<TokenCreateDto> {
		return { expire: addMonths(new Date(), 2), refresh_token: v4(), userId };
	}
}
