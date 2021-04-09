import { Locality } from './locality';

export interface District {
  districtId: number;
  districtName: string;
  areaId: number;
  localities: Locality[];
}
