// export type FilterCondition = {
//   key: string;
//   operator: string;
//   value: any;
// };

export type FilterGroup = {
  and?: FilterCondition[];
  or?: FilterCondition[];
};

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type RelationType = 'all' | string | string[];
export type OrderBy = Record<string, 'ASC' | 'DESC'>;
export type SelectFields<T> = (keyof T)[];
export type FilterCondition = [string, string, unknown];
export interface QueryParams<T> {
  /**
   * Relaciones a cargar
   * - "all"
   * - "relation"
   * - "relation.subrelation"
   * - ["relation1", "relation2.subrelation"]
   */
  relations?: RelationType;

  /**
   * Ordenamiento
   * Ejemplo: { name: 'ASC', createdAt: 'DESC' }
   */
  orderBy?: OrderBy;

  /**
   * Selección de columnas
   * Ejemplo: ['id', 'name']
   */
  select?: SelectFields<T>;

  /**
   * Filtros
   * Puede ser:
   * - Simple: [[col, op, val]]
   * - Grupo: { and: [...], or: [...] }
   * - Con relaciones: ["relation.column", ...]
   */
  attr?: FilterGroup | FilterCondition[];

  /**
   * Paginación
   * Ejemplo: { page: 1, pageSize: 10 }
   */
  pagination?: PaginationParams;
}
