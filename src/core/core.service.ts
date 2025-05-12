/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/core/core.service.ts
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FilterCondition,
  FilterGroup,
  PaginationParams,
  QueryParams,
  RelationType,
  SelectFields,
} from './types/core.types';

@Injectable()
export abstract class CoreService<T extends ObjectLiteral> {
  // Constructor genérico
  constructor(
    @InjectRepository(Object)
    protected readonly repository: Repository<T>,
  ) {}

  processRequest(params: QueryParams<T>): SelectQueryBuilder<T> {
    let query = this.repository.createQueryBuilder('entity');

    if (params.relations) {
      query = this.setRelations(query, params.relations);
    }

    if (params.orderBy) {
      query = this.setOrderBy(query, params.orderBy);
    }

    if (params.select) {
      query = this.setSelect(query, params.select);
    }

    if (params.attr) {
      query = this.setAttr(query, params.attr);
    }

    return query;
  }

  private setRelations(
    query: SelectQueryBuilder<T>,
    relations: RelationType,
  ): SelectQueryBuilder<T> {
    if (Array.isArray(relations)) {
      relations.forEach((relation) => {
        query.leftJoinAndSelect(`entity.${relation}`, relation);
      });
    } else {
      query.leftJoinAndSelect(`entity.${relations}`, relations);
    }
    return query;
  }

  private setOrderBy(
    query: SelectQueryBuilder<T>,
    orderBy: Record<string, 'ASC' | 'DESC'>,
  ): SelectQueryBuilder<T> {
    Object.entries(orderBy).forEach(([key, direction]) => {
      query.addOrderBy(`entity.${key}`, direction);
    });
    return query;
  }

  private setSelect(
    query: SelectQueryBuilder<T>,
    select: SelectFields<T>,
  ): SelectQueryBuilder<T> {
    const selects = select.map((field) => `entity.${field as string}`);
    query.select(selects);
    return query;
  }

  private setAttr(
    query: SelectQueryBuilder<T>,
    filters: FilterGroup | any[],
  ): SelectQueryBuilder<T> {
    let andConditions: any[] = [];
    let orConditions: any[] = [];

    if (Array.isArray(filters)) {
      andConditions = filters;
    } else {
      if ('and' in filters && Array.isArray(filters.and)) {
        andConditions = filters.and;
      }
      if ('or' in filters && Array.isArray(filters.or)) {
        orConditions = filters.or;
      }
    }

    andConditions.forEach((condition) =>
      this.applyCondition(query, condition, 'and'),
    );

    orConditions.forEach((condition) =>
      this.applyCondition(query, condition, 'or'),
    );

    return query;
  }

  private applyCondition(
    query: SelectQueryBuilder<T>,
    condition: FilterCondition,
    type: 'and' | 'or',
  ): void {
    const [key, operator, value] = condition;

    if (!key || !operator) return;

    const method = type === 'or' ? 'orWhere' : 'andWhere';

    if (key.includes('.')) {
      // Relaciones: "relation.field"
      const [relationPath, field] = key.split('.');

      // Usamos whereHas para filtrar por relación
      query[method](`entity.${relationPath}`);
      query.andWhere(`entity.${relationPath}.${field} ${operator} :value`, {
        value,
      });
    } else {
      // Campo normal
      query[method](`entity.${key} ${operator} :value`, { value });
    }
  }

  async getById(id: number, params: QueryParams<T> = {}): Promise<T | null> {
    const query = this.processRequest(params);
    const result = await query.where(`entity.id = :id`, { id }).getOne();

    if (!result) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async getAll(params: QueryParams<T>): Promise<T[]> {
    const query = this.processRequest(params);

    if (params.pagination) {
      return this.applyPagination(query, params.pagination);
    }

    return query.getMany();
  }

  private async applyPagination(
    query: SelectQueryBuilder<T>,
    pagination: PaginationParams,
  ) {
    const { page = 1, pageSize = 10 } = pagination;
    query.skip((page - 1) * pageSize).take(pageSize);
    return await query.getMany();
  }

  async create(data: Partial<T>): Promise<T> {
    const newEntity = this.repository.create(data as any);
    const savedEntity = await this.repository.save(newEntity);
    return Array.isArray(savedEntity) ? savedEntity[0] : savedEntity;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const result = await this.getById(id);

    if (!result || !result.data) {
      // ✅ Verificación segura
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    const entity = result.data;

    Object.assign(entity, data); // ✅ Ahora entity es un objeto válido
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.repository.save(entity);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteMultiple(ids: number[]): Promise<{ deletedCount: number }> {
    const result = await this.repository.delete(ids);
    return { deletedCount: result.affected || 0 };
  }
}
