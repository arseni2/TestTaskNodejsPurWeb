import {forwardRef, Module} from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "./card.entity";
import {ColumnModule} from "../column/column.module";

@Module({
	imports: [ColumnModule, JwtModule, TypeOrmModule.forFeature([CardEntity]), CardModule],
	controllers: [CardController],
	providers: [CardService, JwtService],
	exports: [CardService]
})
export class CardModule {}
