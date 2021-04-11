import { Filter } from '@models/helpers/filter';
import { Pagination } from '@models/helpers/pagination';
import { Sortable } from '@models/helpers/sortable';

export interface LicenseFilter extends Filter, Pagination, Sortable {
  statusId: number;
}
