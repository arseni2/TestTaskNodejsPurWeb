import {CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {ColumnService} from "../column.service";

@Injectable()
export class ColumnAuthorGuard implements CanActivate {
	constructor(
		private readonly columnService: ColumnService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const columnId = request.params.id;

		if (!columnId) {
			throw new NotFoundException('Column ID not provided');
		}

		const column = await this.columnService.findOneById(columnId);

		if (!column) {
			throw new NotFoundException('Column not found');
		}

		if (column.userId !== user.id) {
			throw new ForbiddenException('You are not the owner of this column');
		}

		return true;
	}
}