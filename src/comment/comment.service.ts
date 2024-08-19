import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CommentEntity} from "./comment.entity";
import {Repository} from "typeorm";
import {CardService} from "../card/card.service";
import {CommentCreateDto} from "./dto/commentCreate.dto";
import {CommentUpdateDto} from "./dto/commentUpdate.dto";

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepo: Repository<CommentEntity>,

		private readonly cardService: CardService
	) {
	}

	async findOneById(id: number) {
		return await this.commentRepo.findOne({where: {id}})
	}

	async create(dto: CommentCreateDto, userId: number) {
		const card = await this.cardService.findOneById(dto.cardId)
		if(!card) throw new BadRequestException("cardId не правильный")
		return this.commentRepo.save({
			userId, columnId: card.id, ...dto
		})
	}

	async update(dto: CommentUpdateDto, cardId: number) {
		//FIX
		// @ts-ignore
		delete dto?.userId
		const card = await this.cardService.findOneById(dto.cardId)
		if(!card) throw new BadRequestException("card с таким id нет")
		return this.commentRepo.update(cardId, dto)
	}

	delete(id: number) {
		return this.commentRepo.delete(id)
	}

	getAll(userId: number) {
		return this.commentRepo.find({ where: {userId} })
	}
}
