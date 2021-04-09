import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestService } from '@services/data/request.service';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';
import { REQUEST_PREVIEW } from '@constants/loading-constants';
import { Request } from '@models/request/request';
import { Area } from '@models/locality/area';
import { Locality } from '@models/locality/locality';
import { District } from '@models/locality/district';
import { ActivityService } from '@services/data/activity.service';
import { LocalityService } from '@services/data/locality.service';
import { forkJoin } from 'rxjs';
import { Activity } from '@models/activity/activity';
import { RequestStatus } from '@models/request/request-status';
import { SelectItem } from 'primeng/api';
import { RequestStatuses } from '@constants/enums';

@Component({
  selector: 'app-request-preview',
  templateUrl: './request-preview-dialog.component.html',
  styleUrls: ['./request-preview-dialog.component.scss']
})
export class RequestPreviewDialogComponent implements OnInit {

  loadingConstant = REQUEST_PREVIEW;
  request: Request;

  requestStatuses: RequestStatus[] = [];
  activities: Activity[] = [];
  localities: Area[] = [];
  receivingMethods: SelectItem[] = [
    { label: 'Poșta electronică', value: 1 },
    { label: 'SMS', value: 2 }
  ];

  private requestId: number;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private requestService: RequestService,
              private activityService: ActivityService,
              private localityService: LocalityService,
              public configurationService: ConfigurationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.requestId = this.config.data.requestId;
    this.configurationService.setLoading(true, this.loadingConstant);

    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();
    const $request = this.requestService.getRequestPreview(this.requestId);
    const $statuses = this.requestService.getStatuses();

    forkJoin([$activities, $localities, $request, $statuses]).subscribe(response => {
      this.activities = response[0];
      this.localities = response[1];
      this.request = response[2];
      this.requestStatuses = response[3];
      console.log(this.request);
      this.configurationService.setLoading(false, this.loadingConstant);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
      this.ref.close(false);
    });
  }

  getAreas(request: Request): Area[] {
    return this.localities
    .filter(l => request.areas.includes(l.areaId))
    .map(l => ({
      areaId: l.areaId,
      areaName: l.areaName,
      districts: l.districts
      .filter(d => request.districts.includes(d.districtId))
      .map(d => ({
        districtId: d.districtId,
        districtName: d.districtName,
        localities: d.localities
        .filter(lc => request.localities.includes(lc.localityId))
        .map(lc => ({
          localityId: lc.localityId,
          localityName: lc.localityName
        } as Locality))
      } as District))
    } as Area));
  }

  getLocalitiesAsString(localities: Locality[]): string {
    return localities.map(l => l.localityName).join(', ');
  }

  getActivityNameById(activityId: number): string {
    return this.activities.find(a => a.activityId === activityId)?.activityName || '';
  }

  getStatusNameById(statusId: number): string {
    return this.requestStatuses.find(s => s.statusId === statusId)?.statusName || '';
  }

  getStatusSeverityClass(statusId): string {
    switch (statusId) {
      case 1: return 'green-text';
      case 2: return 'blue-text';
      case 3: return 'orange-text';
      case 4: return 'red-text';
    }
  }

  isNullOrWhiteSpace = (str: string) => {
    return !str || !str.trim();
  }

  get RequestStatuses(): any {
    return RequestStatuses;
  }
}
