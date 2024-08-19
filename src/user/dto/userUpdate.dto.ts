import {PartialType} from "@nestjs/swagger";
import {UserCreateDto} from "./userCreate.dto";

export class UserUpdateDto extends PartialType(UserCreateDto) {}