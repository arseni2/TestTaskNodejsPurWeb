import {CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {CardService} from "../card.service";

@Injectable()
export class CardAuthorGuard implements CanActivate {
	constructor(
		private readonly cardService: CardService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const cardId = request.params.id;

		if (!cardId) {
			throw new NotFoundException('Column ID not provided');
		}

		const card = await this.cardService.findOneById(cardId);

		if (!card) {
			throw new NotFoundException('Card not found');
		}

		if (card.userId !== user.id) {
			throw new ForbiddenException('You are not the owner of this card');
		}

		return true;
	}
}