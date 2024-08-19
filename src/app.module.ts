import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {CommentModule} from "./comment/comment.module";
import {ColumnModule} from "./column/column.module";
import {CardModule} from "./card/card.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormconfig} from "./config/orm.config";
import {join} from "path";
import {TokenModule} from './token/token.module';
import {AuthModule} from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(process.cwd(), '.env'),
		}),
		TypeOrmModule.forRootAsync(ormconfig),
		UserModule,
		ColumnModule,
		CardModule,
		TokenModule,
		AuthModule,
		CommentModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
