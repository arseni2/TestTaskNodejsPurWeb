import {Module} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CommentController} from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./comment.entity";
import {CardModule} from "../card/card.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
	imports: [JwtModule, CardModule, TypeOrmModule.forFeature([CommentEntity])],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
