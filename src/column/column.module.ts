import {Module} from '@nestjs/common';
import {ColumnService} from './column.service';
import {ColumnController} from './column.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ColumnEntity} from "./column.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
	imports: [JwtModule, TypeOrmModule.forFeature([ColumnEntity])],
	controllers: [ColumnController],
	providers: [ColumnService, JwtService],
	exports: [ColumnService]
})
export class ColumnModule {}
