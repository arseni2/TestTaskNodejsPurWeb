import {CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {CommentService} from "../comment.service";

@Injectable()
export class CheckAuthorCommentGuard implements CanActivate {
	constructor(
		private readonly commentService: CommentService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const commentId = request.params.id;

		if (!commentId) {
			throw new NotFoundException('Comment ID not provided');
		}

		const comment = await this.commentService.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException('comment not found');
		}

		if (comment.userId !== user.id) {
			throw new ForbiddenException('You are not the owner of this comment');
		}

		return true;
	}
}