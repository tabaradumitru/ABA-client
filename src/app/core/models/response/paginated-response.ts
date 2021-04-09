import Info from '@models/response/info';
import Warning from '@models/response/warning';

export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  messages?: Info[];
  warnings?: Warning[];
  errors?: Error[];
  success: boolean;
  content: T;
  statusCode: number;
}
