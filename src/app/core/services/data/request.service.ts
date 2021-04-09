import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '@models/request/request';
import { RequestFilter } from '@models/request/request-filter';
import { PaginatedResponse } from '@models/response/paginated-response';
import { Response } from '@models/response/response';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  apiEndpoint = 'api/requests';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/statuses`);
  }

  addRequest(request: Request): Observable<any> {
    return this.http.post<any>(`${this.apiEndpoint}`, request);
  }

  getRequestForUser(idnp: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiEndpoint}`, { params: { idnp }});
  }

  getRequests(filter: RequestFilter): Observable<PaginatedResponse<Request[]>> {
    return this.http.get<PaginatedResponse<Request[]>>(`${this.apiEndpoint}/all-requests`, { params: { ...filter as any } });
  }

  getRequestPreview(requestId: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiEndpoint}/preview/${requestId}`);
  }
}
