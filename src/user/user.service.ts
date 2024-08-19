import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserCreateDto} from "./dto/userCreate.dto";
import {UserUpdateDto} from "./dto/userUpdate.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>
	) {
	}

	create(dto: UserCreateDto) {
		return this.userRepo.create(dto)
	}

	findOneById(id: number) {
		const user = this.userRepo.findOne({where: {id}, transaction: false})
		if(!user) throw new BadRequestException("нет пользователя с таким id")
		return user
	}

	async save(dto: UserCreateDto) {
		return await this.userRepo.save(dto)
	}

	async findOneByEmail(email: string) {
		return await this.userRepo.findOne({where: {email}, transaction: false})
	}

	async update(dto: UserUpdateDto, id: number) {
		return await this.userRepo.update({id}, dto)
	}
}
