import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ColumnService} from "./column.service";
import {ColumnCreateDto} from "./dto/columnCreate.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {IUserFromRequest} from "../types";
import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ColumnAuthorGuard} from "./guards/CheckAuthorColumn.guard";

@ApiBearerAuth()
@Controller('column')
@ApiTags('Column')
export class ColumnController {
	constructor(
		private readonly columnService: ColumnService
	) {
	}


	@UseGuards(AuthGuard)
	@Post("")
	@ApiCreatedResponse({ description: 'Column создана успешно'})
	@ApiUnauthorizedResponse({description: "Вы не авторизованы"})
	create(
		@Body() dto: ColumnCreateDto,
		@Req() req: IUserFromRequest
		) {
		return this.columnService.create(dto, req.user.id)
	}

	@UseGuards(AuthGuard, ColumnAuthorGuard)
	@ApiUnauthorizedResponse({description: "Вы не авторизованы"})
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@Put("/:id")
	update(@Body() dto: ColumnCreateDto, @Param('id') id: string) {
		return this.columnService.update(dto, +id)
	}

	@UseGuards(AuthGuard, ColumnAuthorGuard)
	@ApiUnauthorizedResponse({description: "Вы не авторизованы"})
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@Delete("/:id")
	delete(@Param('id') id: string) {
		return this.columnService.delete(+id)
	}

	@UseGuards(AuthGuard)
	@Get("")
	@ApiOkResponse()
	getAll(@Req() req: IUserFromRequest) {
		return this.columnService.getAll(req.user.id)
	}
}
