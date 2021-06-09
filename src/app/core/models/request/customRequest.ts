import { ReceivingMethod } from '@models/request/receiving-method';

export interface CustomRequest {
  requestId: number;
  licenseId: number;
  licenseNumber: string;
  citizenIdnp: string;
  firstName: string;
  lastName: string;
  activityId: number;
  statusId: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  note: string;
  notifyExpiry: number;
  email?: string;
  personalDataAgreement: boolean;
  obeyLawAgreement: boolean;
  areas: number[];
  districts: number[];
  localities: number[];
  receivingMethods: ReceivingMethod[];
}
