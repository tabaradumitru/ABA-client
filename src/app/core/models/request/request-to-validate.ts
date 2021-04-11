import { MconnectValidation } from '@models/validation/mconnect-validation';
import { CustomRequest } from '@models/request/customRequest';

export interface RequestToValidate extends CustomRequest {
  mconnectValidations: MconnectValidation[];
}
