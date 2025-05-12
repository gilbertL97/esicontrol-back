export enum EnvKey {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',

  // Database
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  DB_SYNCHRONIZE = 'DB_SYNCHRONIZE',
  DB_LOGGING = 'DB_LOGGING',

  // JWT
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES_IN = 'JWT_EXPIRES_IN',

  // Segunda base de datos (opcional)
  DB_LOG_HOST = 'DB_LOG_HOST',
  DB_LOG_PORT = 'DB_LOG_PORT',
  DB_LOG_USERNAME = 'DB_LOG_USERNAME',
  DB_LOG_PASSWORD = 'DB_LOG_PASSWORD',
  DB_LOG_DATABASE = 'DB_LOG_DATABASE',
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}
