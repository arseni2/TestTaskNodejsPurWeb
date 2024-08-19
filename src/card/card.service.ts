import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CardEntity} from "./card.entity";
import {Repository} from "typeorm";
import {CardCreateDto} from "./dto/cardCreate.dto";
import {CardUpdateDto} from "./dto/cardUpdate.dto";
import {ColumnService} from "../column/column.service";

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(CardEntity)
		private readonly cardRepo: Repository<CardEntity>,

		private readonly columnService: ColumnService
	) {
	}

	async findOneById(id: number) {
		return await this.cardRepo.findOne({where: {id}})
	}

	async create(dto: CardCreateDto, userId: number) {
		const column = await this.columnService.findOneById(dto.columnId)
		if(!column) throw new BadRequestException("columnId не правильный")
		return this.cardRepo.save({
			userId, columnId: column.id, ...dto
		})
	}

	async update(dto: CardUpdateDto, cardId: number) {
		//FIX
		// @ts-ignore
		delete dto?.userId
		const column = await this.columnService.findOneById(dto.columnId)
		if(!column) throw new BadRequestException("column с таким id нет")
		return this.cardRepo.update(cardId, dto)
	}

	delete(id: number) {
		return this.cardRepo.delete(id)
	}

	getAll(userId: number) {
		return this.cardRepo.find({ where: {userId} })
	}
}
