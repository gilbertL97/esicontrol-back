import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SecurityController, UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SecurityService, UserService],
})
export class SecurityModule {}
