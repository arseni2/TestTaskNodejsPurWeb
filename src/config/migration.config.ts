import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

export const options: DataSourceOptions = {
	type: 'postgres',
	host: process.env.TYPEORM_HOST,
	schema: process.env.TYPEORM_SCHEMA,
	port: +process.env.TYPEORM_PORT,
	username: process.env.TYPEORM_USERNAME,
	database: process.env.TYPEORM_DATABASE,
	password: process.env.TYPEORM_PASSWORD,
	entities: [
		// CostOptionEntity,
		// EventEntity,
		// EventPlaceCostOptionEntity,
		// EventPlaceTagEntity,
		// ImageEntity,
		// InfoEntity,
		// PlaceEntity,
		// RoleEntity,
		// TagEntity,
		// TokenEntity,
		// UserEntity,
	],
	migrations: [join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
	migrationsTableName: 'migrations',
	synchronize: true,
	logging: true,
};

const dataSource = new DataSource(options);

export default dataSource;
