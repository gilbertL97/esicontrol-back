import { Global, Module } from '@nestjs/common';
import { CustomConfigService } from './custom-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnects } from './dataSource/postgresDataSource';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(postgresConnects)],
  providers: [CustomConfigService],
  exports: [
    TypeOrmModule, // Exporta TypeORM para que otros módulos puedan inyectar repositorios
    CustomConfigService, // Exporta el servicio si lo necesitas en otros lugares
  ],
})
export class CustomConfigModule {}
