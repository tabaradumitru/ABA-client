import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequestService } from '@services/data/request.service';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';
import { REQUEST_PREVIEW } from '@constants/loading-constants';
import { CustomRequest } from '@models/request/customRequest';
import { Area } from '@models/locality/area';
import { Locality } from '@models/locality/locality';
import { District } from '@models/locality/district';
import { ActivityService } from '@services/data/activity.service';
import { LocalityService } from '@services/data/locality.service';
import { forkJoin } from 'rxjs';
import { Activity } from '@models/activity/activity';
import { RequestStatus } from '@models/request/request-status';
import { RequestStatuses } from '@constants/enums';
import { RequestToValidate } from '@models/request/request-to-validate';
import { LicenseService } from '@services/data/license.service';

@Component({
  selector: 'app-request-preview',
  templateUrl: './request-preview-dialog.component.html',
  styleUrls: ['./request-preview-dialog.component.scss']
})
export class RequestPreviewDialogComponent implements OnInit {

  loadingConstant = REQUEST_PREVIEW;
  request: RequestToValidate;

  requestStatuses: RequestStatus[] = [];
  activities: Activity[] = [];
  localities: Area[] = [];

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private requestService: RequestService,
              private licenseService: LicenseService,
              private activityService: ActivityService,
              private localityService: LocalityService,
              public configurationService: ConfigurationService,
              private notificationService: NotificationService) {
    this.configurationService.setLoading(true, this.loadingConstant);
  }

  ngOnInit(): void {
    const requestId = this.config.data.requestId;

    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();
    const $request = this.requestService.getRequestPreview(requestId);
    const $statuses = this.requestService.getStatuses();

    forkJoin([$activities, $localities, $request, $statuses]).subscribe(response => {
      this.activities = response[0];
      this.localities = response[1];
      this.request = response[2];
      this.requestStatuses = response[3];
      this.configurationService.setLoading(false, this.loadingConstant);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
      this.ref.close(false);
    });
  }

  getAreas(request: CustomRequest): Area[] {
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

  get RequestStatuses(): typeof RequestStatuses {
    return RequestStatuses;
  }

  onApproveRequest(): void {
    this.configurationService.setLoading(true, this.loadingConstant);

    this.licenseService.createLicense(this.request.requestId).subscribe(response => {
      this.ref.close(true);
      this.notificationService.callSuccess('Succes', 'Permisul a fost creat cu succes!');
      this.configurationService.setLoading(false, this.loadingConstant);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
    });
  }
}
