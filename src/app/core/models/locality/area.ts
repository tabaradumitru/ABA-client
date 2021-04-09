import { District } from './district';

export interface Area {
  areaId: number;
  areaName: string;
  districts: District[];
}
