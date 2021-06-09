import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ALL_USER_LICENSES } from '@constants/loading-constants';
import { LicenseStatus } from '@models/license/license-status';
import { Activity } from '@models/activity/activity';
import { Area } from '@models/locality/area';
import { License } from '@models/license/license';
import { LicenseService } from '@services/data/license.service';
import { ActivityService } from '@services/data/activity.service';
import { LocalityService } from '@services/data/locality.service';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';
import { DialogService } from 'primeng/dynamicdialog';
import { LicenseFilter } from '@models/license/license-filter';
import { forkJoin } from 'rxjs';
import { PaginatedResponse } from '@models/response/paginated-response';
import { CustomRequest } from '@models/request/customRequest';
import { Locality } from '@models/locality/locality';
import { District } from '@models/locality/district';
import { LicensePreviewDialogComponent } from '@client-dashboard/pages/license-preview-dialog/license-preview-dialog.component';

@Component({
  selector: 'app-all-licenses',
  templateUrl: './all-licenses.component.html',
  styleUrls: ['./all-licenses.component.scss'],
  providers: [DialogService]
})
export class AllLicensesComponent implements OnInit {

  loadingConstant = ALL_USER_LICENSES;
  licenseStatuses: LicenseStatus[] = [];
  activities: Activity[] = [];
  localities: Area[] = [];

  dataResponse: PaginatedResponse<License[]> = {} as PaginatedResponse<License[]>;
  licenses: License[] = [];
  filter: LicenseFilter = {
    page: 1,
    pageSize: 10
  } as LicenseFilter;
  first: number;

  items: MenuItem[] = [{
    label: 'PERMISE',
    routerLink: '/permise'
  }];

  constructor(private licenseService: LicenseService,
              private activityService: ActivityService,
              private localityService: LocalityService,
              public configurationService: ConfigurationService,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    const $statuses = this.licenseService.getStatuses();
    const $licenses = this.licenseService.getUserLicenses(this.filter);
    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();

    forkJoin([$statuses, $activities, $localities, $licenses]).subscribe(response => {
      this.licenseStatuses = response[0];
      this.activities = response[1];
      this.localities = response[2];
      this.licenses = response[3].content;
      this.dataResponse.pageSize = response[3].pageSize;
      this.dataResponse.totalCount = response[3].totalCount;
      this.first = (response[3].currentPage - 1) * response[3].pageSize;
      setTimeout(() => this.configurationService.setLoading(false, this.loadingConstant), 500);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
    });
  }

  onLazyLoad(event: LazyLoadEvent): void {
    this.filter = {} as LicenseFilter;
    this.filter.page = event.first / event.rows + 1;
    this.filter.pageSize = event.rows;
    this.filter.sortOrder = event.sortOrder;
    this.filter.sortField = event.sortField;

    for (const filtersKey in event.filters) {
      if (event.filters[filtersKey].value) {
        this.filter[filtersKey] = event.filters[filtersKey].value;

        if (this.filter.createdAt) {
          const local = new Date(this.filter.createdAt);
          local.setHours(local.getHours() + 3);
          this.filter.createdAt = local.toISOString();
        }

        if (this.filter.startDate) {
          const local = new Date(this.filter.startDate);
          local.setHours(local.getHours() + 3);
          this.filter.startDate = local.toISOString();
        }

        if (this.filter.endDate) {
          const local = new Date(this.filter.endDate);
          local.setHours(local.getHours() + 3);
          this.filter.endDate = local.toISOString();
        }
      }
    }

    this.loadLicenses();
  }

  loadLicenses(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.licenseService.getUserLicenses(this.filter).subscribe(response => {
      this.licenses = response.content;
      this.dataResponse.pageSize = response.pageSize;
      this.dataResponse.totalCount = response.totalCount;
      this.first = (response.currentPage - 1) * response.pageSize;
      this.configurationService.setLoading(false, this.loadingConstant);
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
    });
  }

  getActivityNameById(activityId: number): string {
    return this.activities.find(a => a.activityId === activityId)?.activityName || '';
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

  getStatusNameById(statusId: number): string {
    return this.licenseStatuses.find(s => s.statusId === statusId)?.statusName || '';
  }

  getStatusSeverityString(statusId): string {
    switch (statusId) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'danger';
    }
  }

  onRowSelect(selectedLicense: License): void {
    this.dialogService.open(LicensePreviewDialogComponent, {
      data: { licenseId: selectedLicense.licenseId },
      header: `Vizualizare permis | ${selectedLicense.licenseNumber}`,
      dismissableMask: true,
      width: '70vw'
    });
  }

  onClearFilterField(field: string): void {
    this.filter[field] = '';
  }

  getNewDate(): Date {
    return new Date();
  }
}
