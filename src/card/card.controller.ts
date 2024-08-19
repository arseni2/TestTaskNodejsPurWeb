import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CardService} from "./card.service";
import {AuthGuard} from "../auth/guards/auth.guard";
import {IUserFromRequest} from "../types";
import {CardCreateDto} from "./dto/cardCreate.dto";
import {ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ColumnCreateDto} from "../column/dto/columnCreate.dto";
import {ColumnAuthorGuard} from "../column/guards/CheckAuthorColumn.guard";

@ApiBearerAuth()
@Controller('card')
@ApiTags("Card")
export class CardController {
	constructor(
		private readonly cardService: CardService
	) {
	}

	@UseGuards(AuthGuard)
	@Post("")
	@ApiUnauthorizedResponse({
		description: "Вы не авторизованы"
	})
	@ApiBadRequestResponse({
		description: "columnId не правильный"
	})
	create(
		@Req() req: IUserFromRequest,
		@Body() dto: CardCreateDto
	) {
		return this.cardService.create(dto, req.user.id)
	}

	@UseGuards(AuthGuard)
	@Get("")
	@ApiUnauthorizedResponse({
		description: "Вы не авторизованы"
	})
	@ApiOkResponse()
	getAll(
		@Req() req: IUserFromRequest
	) {
		return this.cardService.getAll(req.user.id)
	}

	@UseGuards(AuthGuard, ColumnAuthorGuard)
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@ApiBadRequestResponse({
		description: "columnId не правильный"
	})
	@Put("/:id")
	update(@Body() dto: ColumnCreateDto, @Param('id') id: string) {
		return this.cardService.update(dto, +id)
	}

	@UseGuards(AuthGuard, ColumnAuthorGuard)
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@ApiBadRequestResponse({
		description: "cardId не правильный"
	})
	@Delete("/:id")
	delete(@Param('id') id: string) {
		return this.cardService.delete(+id)
	}
}
