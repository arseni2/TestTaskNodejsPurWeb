import {PartialType} from "@nestjs/swagger";
import {CommentCreateDto} from "./commentCreate.dto";

export class CommentUpdateDto extends PartialType(CommentCreateDto) {}