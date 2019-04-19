export interface IAbstractListResponse<T extends any> {
  meta: {
    result_count: number;
    total_count: number;
  };
  data: T[];
}
