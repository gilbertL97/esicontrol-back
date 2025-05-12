/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean; // Opcional, y se usa el valor por defecto si no viene
}
