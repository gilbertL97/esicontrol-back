import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './security/security.module';
import { CustomConfigModule } from './custom-config/custom-config.module';
//import { CoreModule } from './core/core.module';
@Module({
  imports: [SecurityModule, CustomConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
