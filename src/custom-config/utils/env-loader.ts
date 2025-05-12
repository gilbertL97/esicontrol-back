import * as dotenv from 'dotenv';
import { EnvKey } from '../constants/contstantsConfig';

dotenv.config();

export const getEnv = (key: EnvKey): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Variable ${key} no definida en .env`);
  return value;
};

// Helpers para tipos
export const getEnvNumber = (key: EnvKey): number => parseInt(getEnv(key), 10);
export const getEnvBoolean = (key: EnvKey): boolean => getEnv(key) === 'true';
