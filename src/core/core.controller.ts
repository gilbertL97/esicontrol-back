/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CoreService } from './core.service';
import { ObjectLiteral } from 'typeorm';
import { QueryParams } from './types/core.types';

@Controller('core')
@Controller()
export class CoreController<T extends ObjectLiteral> {
  constructor(protected readonly service: CoreService<T>) {}

  // GET /?page=1&limit=10
  @Get()
  async getAll(@Query() params: QueryParams<T>) {
    const data = await this.service.getAll(params);
    return {
      success: true,
      message: 'Resources retrieved successfully.',
      data,
    };
  }

  // POST /
  @Post()
  async create(@Body() dto: any) {
    const result = await this.service.create(dto);
    if (!result) {
      return {
        success: false,
        message: 'Failed to create resource',
      };
    }
    return {
      success: true,
      message: 'Resource created successfully.',
      data: result,
    };
  }

  // GET /:id
  @Get(':id')
  async getById(@Param('id') id: string, @Query() params: any) {
    try {
      const result = await this.service.getById(+id, params);
      return {
        success: true,
        message: 'Resource retrieved successfully.',
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Resource not found.',
        error: e.message,
        status: HttpStatus.NOT_FOUND,
      };
    }
  }

  // PUT /:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.service.update(+id, dto);
    return {
      success: true,
      message: 'Resource updated successfully.',
      data: result,
    };
  }

  // DELETE /:id
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const result = await this.service.deleteById(+id);
    return {
      success: true,
      message: 'Resource deleted successfully.',
      data: result,
    };
  }

  // DELETE /multiple
  @Delete('multiple')
  async deleteMultiple(@Body() body: { ids: number[] }) {
    const result = await this.service.deleteMultiple(body.ids);
    return {
      success: true,
      message: 'Resources deleted successfully.',
      data: result,
    };
  }
}
