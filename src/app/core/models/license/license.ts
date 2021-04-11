import { ReceivingMethod } from '@models/request/receiving-method';

export interface License {
  licenseId: number;
  licenseNumber: string;
  citizenIdnp: number;
  firstName: string;
  lastName: string;
  activityId: number;
  statusId: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  notifyExpiry: number;
  note: string;
  areas: number[];
  districts: number[];
  localities: number[];
  receivingMethods: ReceivingMethod[];
}
