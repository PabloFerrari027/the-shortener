export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationOptions<T> {
  take?: number;
  skip?: number;
  orderBy?: T;
  order?: Order;
}
