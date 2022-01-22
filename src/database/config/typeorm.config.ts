import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOSTNAME || 'localhost',
  port: parseInt(process.env.PORTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'a2a-forum',

  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  // seeds: ['dist/database/seeds/**/*.js'],
  // factories: ['dist/database/factories/**/*.js'],
};

module.exports = typeOrmConfig;
