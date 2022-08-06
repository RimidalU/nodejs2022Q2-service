import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

export default {
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: true,
  // autoLoadEntities: true,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/**/migration/*{.ts,.js}'],
  // migrationsRun: true,
} as DataSourceOptions;
