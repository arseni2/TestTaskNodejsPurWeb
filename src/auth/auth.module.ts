import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {TokenModule} from "../token/token.module";


@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				global: true,
				secret: config.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') },
			}),
		}),
		TokenModule
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
