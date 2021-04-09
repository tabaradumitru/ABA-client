import Info from '@models/response/info';
import Warning from '@models/response/warning';

export interface Response<T> {
  messages?: Info[];
  warnings?: Warning[];
  errors?: Error[];
  success: boolean;
  content: T;
  statusCode: number;
}
