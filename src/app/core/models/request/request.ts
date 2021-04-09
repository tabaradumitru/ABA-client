import { ReceivingMethod } from '@models/request/receiving-method';

export interface Request {
  requestId: number;
  citizenIdnp: string;
  firstName: string;
  lastName: string;
  activityId: number;
  statusId: number;
  startDate: string;
  endDate: string;
  phone: string;
  createdAt: string;
  notifyExpiry: boolean;
  email?: string;
  personalDataAgreement: boolean;
  obeyLawAgreement: boolean;
  areas: number[];
  districts: number[];
  localities: number[];
  note: string;
  receivingMethods: ReceivingMethod[];
}
