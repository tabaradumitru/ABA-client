import { Area } from './area';
import { District } from './district';
import { Locality } from './locality';

export interface Localities {
  areas: Area[];
  districts: District[];
  localities: Locality[];
}
