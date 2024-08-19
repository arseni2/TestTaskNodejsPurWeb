import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {AuthGuard} from "../auth/guards/auth.guard";
import {IUserFromRequest} from "../types";
import {ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CheckAuthorCommentGuard} from "./guards/CheckAuthorComment.guard";
import {CommentCreateDto} from "./dto/commentCreate.dto";
import {CommentUpdateDto} from "./dto/commentUpdate.dto";

@ApiBearerAuth()
@Controller('comment')
@ApiTags("Comment")
export class CommentController {
	constructor(
		private readonly commentService: CommentService
	) {
	}

	@UseGuards(AuthGuard)
	@Post("")
	create(
		@Req() req: IUserFromRequest,
		@Body() dto: CommentCreateDto
	) {
		return this.commentService.create(dto, req.user.id)
	}

	@UseGuards(AuthGuard)
	@ApiOkResponse()
	@Get("")
	getAll(
		@Req() req: IUserFromRequest
	) {
		return this.commentService.getAll(req.user.id)
	}

	@UseGuards(AuthGuard, CheckAuthorCommentGuard)
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@ApiNotFoundResponse()
	@Put("/:id")
	update(@Body() dto: CommentUpdateDto, @Param('id') id: string) {
		return this.commentService.update(dto, +id)
	}

	@UseGuards(AuthGuard, CheckAuthorCommentGuard)
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	@ApiNotFoundResponse()
	@Delete("/:id")
	delete(@Param('id') id: string) {
		return this.commentService.delete(+id)
	}
}
