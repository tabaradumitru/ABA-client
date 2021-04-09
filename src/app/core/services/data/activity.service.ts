import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '@models/activity/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiEndpoint = 'api/activities';

  constructor(private http: HttpClient) {
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiEndpoint}`);
  }
}
