import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '@models/response/response';
import { LicenseId } from '@models/license/license-id';
import { LicenseFilter } from '@models/license/license-filter';
import { PaginatedResponse } from '@models/response/paginated-response';
import { License } from '@models/license/license';
import { LicenseStatus } from '@models/license/license-status';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private apiEndpoint = 'api/licenses';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<LicenseStatus[]> {
    return this.http.get<LicenseStatus[]>(`${this.apiEndpoint}/statuses`);
  }

  createLicense(requestId: number): Observable<Response<LicenseId>> {
    return this.http.post<Response<LicenseId>>(`${this.apiEndpoint}`, { requestId });
  }

  getLicense(licenseId: number): Observable<License> {
    return this.http.get<License>(`${this.apiEndpoint}/${licenseId}`);
  }

  getUserLicenses(filter: LicenseFilter): Observable<PaginatedResponse<License[]>> {
    return this.http.get<PaginatedResponse<License[]>>(`${this.apiEndpoint}`, { params: { ...filter as any } });
  }
}
