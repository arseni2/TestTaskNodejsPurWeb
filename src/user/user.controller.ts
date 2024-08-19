import {Controller, Get, Param} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags("User")
export class UserController {
	constructor(
		private readonly userService: UserService
	) {
	}

	@Get("/:id")
	findOne(@Param("id") id: string) {
		return this.userService.findOneById(+id)
	}
}
