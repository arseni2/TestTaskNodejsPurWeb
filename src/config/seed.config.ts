import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env') });

const options = {
	type: 'postgres',
	host: process.env.TYPEORM_HOST,
	schema: process.env.TYPEORM_SCHEMA,
	port: process.env.TYPEORM_PORT,
	username: process.env.TYPEORM_USERNAME,
	database: process.env.TYPEORM_DATABASE,
	password: process.env.TYPEORM_PASSWORD,
	entities: ['dist/**/entities/*.entity.{js,ts}'],
	factories: ['dist/database/factories/**/*.js'],
	seeds: ['dist/database/seeds/**/*.js'],
	migrationsTableName: 'migrations',
	migrationsRun: false,
	synchronize: false,
	logging: true,
};

export default options;
