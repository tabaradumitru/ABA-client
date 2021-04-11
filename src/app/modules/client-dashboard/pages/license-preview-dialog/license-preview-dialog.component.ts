import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '@services/configuration.service';
import { LICENSE_PREVIEW } from '@constants/loading-constants';
import { License } from '@models/license/license';
import { Activity } from '@models/activity/activity';
import { Area } from '@models/locality/area';
import { LicenseStatus } from '@models/license/license-status';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LicenseService } from '@services/data/license.service';
import { ActivityService } from '@services/data/activity.service';
import { LocalityService } from '@services/data/locality.service';
import { NotificationService } from '@services/notification.service';
import { forkJoin } from 'rxjs';
import { Locality } from '@models/locality/locality';
import { District } from '@models/locality/district';

@Component({
  selector: 'app-license-preview-dialog',
  templateUrl: './license-preview-dialog.component.html',
  styleUrls: ['./license-preview-dialog.component.scss']
})
export class LicensePreviewDialogComponent implements OnInit {

  loadingConstant = LICENSE_PREVIEW;
  license: License;

  licenseStatuses: LicenseStatus[] = [];
  activities: Activity[] = [];
  localities: Area[] = [];

  constructor(public configurationService: ConfigurationService,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private licenseService: LicenseService,
              private activityService: ActivityService,
              private localityService: LocalityService,
              private notificationService: NotificationService) {
    this.configurationService.setLoading(true, this.loadingConstant);
  }

  ngOnInit(): void {
    const licenseId = this.config.data.licenseId;

    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();
    const $statuses = this.licenseService.getStatuses();
    const $license = this.licenseService.getLicense(licenseId);

    forkJoin([$activities, $localities, $statuses, $license]).subscribe(response => {
      this.activities = response[0];
      this.localities = response[1];
      this.licenseStatuses = response[2];
      this.license = response[3];
      this.configurationService.setLoading(false, this.loadingConstant);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
      this.ref.close(false);
    });
  }

  getAreas(license: License): Area[] {
    return this.localities
      .filter(l => license.areas.includes(l.areaId))
      .map(l => ({
        areaId: l.areaId,
        areaName: l.areaName,
        districts: l.districts
        .filter(d => license.districts.includes(d.districtId))
        .map(d => ({
          districtId: d.districtId,
          districtName: d.districtName,
          localities: d.localities
          .filter(lc => license.localities.includes(lc.localityId))
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
    return this.licenseStatuses.find(s => s.statusId === statusId)?.statusName || '';
  }

  getStatusSeverityClass(statusId): string {
    switch (statusId) {
      case 1: return 'green-text';
      case 2: return 'orange-text';
      case 3: return 'red-text';
    }
  }

  isNullOrWhiteSpace = (str: string) => {
    return !str || !str.trim();
  }
}
