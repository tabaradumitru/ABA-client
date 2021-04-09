import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Request } from '@models/request/request';
import { RequestService } from '@services/data/request.service';
import { RequestStatus } from '@models/request/request-status';
import { NotificationService } from '@services/notification.service';
import { forkJoin } from 'rxjs';
import { ActivityService } from '@services/data/activity.service';
import { Activity } from '@models/activity/activity';
import { LocalityService } from '@services/data/locality.service';
import { Area } from '@models/locality/area';
import { District } from '@models/locality/district';
import { Locality } from '@models/locality/locality';
import { GLOBAL_SPINNER } from '@constants/loading-constants';
import { ConfigurationService } from '@services/configuration.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NewRequestDialogComponent } from '@client-dashboard/pages/new-request-dialog/new-request-dialog.component';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss'],
  providers: [DialogService]
})
export class AllRequestsComponent implements OnInit {

  loadingConstant = GLOBAL_SPINNER;
  requestStatuses: RequestStatus[] = [];
  activities: Activity[] = [];
  localities: Area[] = [];

  items: MenuItem[] = [{
    label: 'CERERI',
    routerLink: '/cereri'
  }];

  actionMenu: MenuItem[] = [{
    label: 'Reemite cererea',
    icon: 'pi pi-replay'
  }, {
    label: 'Anulează cererea',
    icon: 'pi pi-times'
  }];

  requests: Request[] = [];

  idnp = '2008024014423';

  constructor(public router: Router,
              private requestService: RequestService,
              private activityService: ActivityService,
              private localityService: LocalityService,
              private notificationService: NotificationService,
              private configurationService: ConfigurationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    const $statuses = this.requestService.getStatuses();
    const $requests = this.requestService.getRequestForUser(this.idnp);
    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();

    forkJoin([$statuses, $requests, $activities, $localities]).subscribe(response => {
      this.requestStatuses = response[0];
      this.requests = response[1];
      this.activities = response[2];
      this.localities = response[3];
      setTimeout(() => this.configurationService.setLoading(false, this.loadingConstant), 500);
    }, error => {
      console.log(error);
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
    });
  }

  getStatusSeverityString(statusId): string {
    switch (statusId) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
    }
  }

  getActivityNameById(activityId: number): string {
    return this.activities.find(a => a.activityId === activityId)?.activityName || '';
  }

  getStatusNameById(statusId: number): string {
    return this.requestStatuses.find(s => s.statusId === statusId)?.statusName || '';
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

  openNewRequestDialog(): void {
    this.dialogService.open(NewRequestDialogComponent, {
      header: 'Cerere Nouă',
      width: '70vw',
    }).onClose.subscribe((response: Request) => {
      if (response) {
        const index = this.requests.findIndex(r => r.requestId === response.requestId);

        if (index !== -1) {
          this.requests.unshift(response);
        } else {
          this.requests[index] = response;
        }
      }
    });
  }
}
