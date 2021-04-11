export interface RequestToAdd {
  citizenIdnp: string;
  activityId: number;
  startDate: string;
  endDate: string;
  notifyExpiry: number;
  phone: string;
  email: string;
  note: string;
  personalDataAgreement: boolean;
  obeyLawAgreement: boolean;
  areas: number[];
  districts: number[];
  localities: number[];
}
