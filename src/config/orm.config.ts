import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (config: ConfigService) => {
		return {
			type: 'postgres',
			host: process.env.TYPEORM_HOST,
			port: +process.env.TYPEORM_PORT,
			username: process.env.TYPEORM_USERNAME,
			database: process.env.TYPEORM_DATABASE,
			password: process.env.TYPEORM_PASSWORD,
			entities: ['dist/**/*.entity{.ts,.js}'],
			synchronize: false,
			autoLoadEntities: false,
			logging: true,
		};
	},
};
