import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ColumnEntity} from "./column.entity";
import {Repository} from "typeorm";
import {ColumnCreateDto} from "./dto/columnCreate.dto";

@Injectable()
export class ColumnService {
	constructor(
		@InjectRepository(ColumnEntity)
		private readonly columnRepo: Repository<ColumnEntity>
	) {
	}

	async create(dto: ColumnCreateDto, userId: number) {
		return await this.columnRepo.save({...dto, userId })
	}

	async getAll(userId: number) {
		return await this.columnRepo.find({ where: {userId}, transaction: false })
	}

	async findOneById(id: number) {
		return await this.columnRepo.findOne({ where: {id}, transaction: false })
	}

	async update(dto: ColumnCreateDto, id: number) {
		//FIX
		// @ts-ignore
		delete dto?.userId
		return await this.columnRepo.update(id, dto)
	}

	async delete(id: number) {
		return await this.columnRepo.delete(id)
	}
}
