import {PartialType} from "@nestjs/swagger";
import {CardCreateDto} from "./cardCreate.dto";

export class CardUpdateDto extends PartialType(CardCreateDto) {}