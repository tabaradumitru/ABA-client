import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomRequest } from '@models/request/customRequest';
import { RequestFilter } from '@models/request/request-filter';
import { PaginatedResponse } from '@models/response/paginated-response';
import { RequestToValidate } from '@models/request/request-to-validate';
import { RequestToAdd } from '@models/request/request-to-add';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  apiEndpoint = 'api/requests';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/statuses`);
  }

  addRequest(request: RequestToAdd): Observable<any> {
    return this.http.post<any>(`${this.apiEndpoint}`, request);
  }

  getUserRequests(filter: RequestFilter): Observable<PaginatedResponse<CustomRequest[]>> {
    return this.http.get<PaginatedResponse<CustomRequest[]>>(`${this.apiEndpoint}`, { params: { ...filter as any } });
  }

  getRequests(filter: RequestFilter): Observable<PaginatedResponse<CustomRequest[]>> {
    return this.http.get<PaginatedResponse<CustomRequest[]>>(`${this.apiEndpoint}/all-requests`, { params: { ...filter as any } });
  }

  getRequestPreview(requestId: number): Observable<RequestToValidate> {
    return this.http.get<RequestToValidate>(`${this.apiEndpoint}/preview/${requestId}`);
  }
}
