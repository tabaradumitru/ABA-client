import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '@models/locality/area';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  apiEndpoint = 'api/localities';

  constructor(private http: HttpClient) {
  }

  getAllLocalities(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.apiEndpoint}`);
  }
}
