import { Filter } from '@models/helpers/filter';
import { Pagination } from '@models/helpers/pagination';
import { Sortable } from '@models/helpers/sortable';

export interface LicenseFilter extends Filter, Pagination, Sortable {
  citizenIdnp: string;
  licenseNumber: string;
  activityId: number;
  localityName: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  statusId: number;
}
