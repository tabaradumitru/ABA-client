import { Role } from '@constants/enums';

export interface User {
  idnp: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: string;
}
