import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceivingMethod } from '@models/receiving-method/receiving-method';

@Injectable({
  providedIn: 'root'
})
export class ReceivingMethodService {

  apiEndpoint = 'api/receiving-methods';

  constructor(private http: HttpClient) { }

  getReceivingMethods(): Observable<ReceivingMethod[]> {
    return this.http.get<ReceivingMethod[]>(this.apiEndpoint);
  }
}
