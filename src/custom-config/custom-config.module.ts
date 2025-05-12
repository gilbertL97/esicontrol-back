import { Module } from '@nestjs/common';
import { CustomConfigService } from './custom-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnects } from './dataSource/postgresDataSource';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConnects)],
  providers: [CustomConfigService],
  exports: [TypeOrmModule],
})
export class CustomConfigModule {}
