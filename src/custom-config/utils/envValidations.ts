import * as Joi from 'joi';
import { EnvKey } from '../constants/contstantsConfig';

export const databaseSchema = {
  [EnvKey.DB_HOST]: Joi.string().required().description('Database host'),
  [EnvKey.DB_PORT]: Joi.number().port().default(5432),
  [EnvKey.DB_USERNAME]: Joi.string().required(),
  [EnvKey.DB_PASSWORD]: Joi.string().required().min(8),
  [EnvKey.DB_DATABASE]: Joi.string().required(),
  [EnvKey.DB_SYNCHRONIZE]: Joi.boolean()
    .default(false)
    .description('⚠️  No usar en producción!'),
  [EnvKey.DB_LOGGING]: Joi.boolean().default(false),

  // Configuración secundaria (opcional)
  [EnvKey.DB_LOG_HOST]: Joi.string().when(EnvKey.NODE_ENV, {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
};
