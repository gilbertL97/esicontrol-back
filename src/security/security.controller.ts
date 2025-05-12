import {
  Controller,
  Get,
  Post,
  //Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  create() {
    return this.securityService.create();
  }

  @Get()
  findAll() {
    return this.securityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.securityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.securityService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.securityService.remove(+id);
  }
}
