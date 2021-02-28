export interface Request {
  activity: number;
  phone: string;
  startDate: string;
  endDate: string;
  receivingMethod: number[];
  notifyExpiry: boolean;
}
