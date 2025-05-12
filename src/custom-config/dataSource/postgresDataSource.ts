import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvKey } from '../constants/contstantsConfig';
import { getEnv, getEnvNumber, getEnvBoolean } from '../utils/env-loader';
export const postgresConnects: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getEnv(EnvKey.DB_HOST),
  port: getEnvNumber(EnvKey.DB_PORT),
  username: getEnv(EnvKey.DB_USERNAME),
  password: getEnv(EnvKey.DB_PASSWORD),
  database: getEnv(EnvKey.DB_DATABASE),
  synchronize: getEnvBoolean(EnvKey.DB_SYNCHRONIZE),
  logging: getEnvBoolean(EnvKey.DB_LOGGING),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
};
