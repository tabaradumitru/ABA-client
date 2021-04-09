import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, SelectItemGroup } from 'primeng/api';
import { Request } from '@models/request/request';
import { Activity } from '@models/activity/activity';
import { ActivityService } from '@services/data/activity.service';
import { LocalityService } from '@services/data/locality.service';
import { Area } from '@models/locality/area';
import { RequestService } from '@services/data/request.service';
import { NotificationService } from '@services/notification.service';
import { AuthenticationService } from '@services/authentication.service';
import { forkJoin } from 'rxjs';
import { NEW_REQUEST } from '@constants/loading-constants';
import { ConfigurationService } from '@services/configuration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/auth/user';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request-dialog.component.html',
  styleUrls: ['./new-request-dialog.component.scss']
})
export class NewRequestDialogComponent implements OnInit {

  loadingConstant = NEW_REQUEST;
  activities: Activity[] = [];
  allLocalities: Area[];
  areas: SelectItem[] = [];
  districts: SelectItemGroup[] = [];
  localities: SelectItemGroup[] = [];
  startDate: Date;
  endDate: Date;
  requestForm: FormGroup;

  receivingMethods: SelectItem[] = [
    { label: 'Poșta electronică', value: 1 },
    { label: 'SMS', value: 2 }
  ];

  items: MenuItem[] = [{
    label: 'CERERE NOUĂ',
    routerLink: 'cereri/cerere-noua'
  }];

  request = {} as Request;
  user: User = {} as User;

  constructor(private activityService: ActivityService,
              private localityService: LocalityService,
              private requestService: RequestService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              public configurationService: ConfigurationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.initForm();
    this.assignUserData();

    const $activities = this.activityService.getActivities();
    const $localities = this.localityService.getAllLocalities();

    forkJoin([$activities, $localities]).subscribe(response => {
      this.activities = response[0];

      this.allLocalities = response[1];
      this.mapLocalities();
      setTimeout(() => this.configurationService.setLoading(false, this.loadingConstant), 500);
    });
  }

  onChangeArea(selectedAreas: number[]): void {
    this.districts = this.allLocalities
      .filter(l => selectedAreas.includes(l.areaId))
      .map(r => ({
        value: r.areaId,
        label: r.areaName,
        items: r.districts.map(d => ({
          value: d.districtId,
          label: d.districtName
        } as SelectItem))
      } as SelectItemGroup));
  }

  onChangeDistrict(selectedDistricts: number[]): void {
    this.localities = [];
    this.allLocalities.forEach(l => this.localities.push(
      ...l.districts
        .filter(d => selectedDistricts.includes(d.districtId))
        .map(d => ({
          value: d.districtId,
          label: d.districtName,
          items: d.localities.map(loc => ({
            value: loc.localityId,
            label: loc.localityName
          } as SelectItem))
        } as SelectItemGroup))
    ));
  }

  addRequest(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.requestService.addRequest({ ...this.requestForm.value } as Request).subscribe(() => {
      this.notificationService.callSuccess('Succes', 'Cererea a fost expediată cu succes!');
      this.configurationService.setLoading(false, this.loadingConstant);
      this.ref.close();
    }, error => {
      this.notificationService.notifyHttpErrors(error);
      this.configurationService.setLoading(false, this.loadingConstant);
    });
  }

  private initForm(): void {
    this.requestForm = this.formBuilder.group({
      requestId: [0],
      activityId: [null, Validators.required],
      statusId: [1],
      startDate: [null, Validators.required],
      startDateValue: [null, Validators.required],
      endDate: [null, Validators.required],
      endDateValue: [null, Validators.required],
      phone: [null, Validators.required],
      createdAt: [null],
      receivingMethod: [null, Validators.required],
      notifyExpiry: [false],
      email: [ { value: null, disabled: true }],
      personalDataAgreement: [false, Validators.requiredTrue],
      obeyLawAgreement: [false, Validators.requiredTrue],
      areas: [[], Validators.required],
      districts: [{ value: [], disabled: true }, Validators.required],
      localities: [{ value: [], disabled: true }, Validators.required],
      notes: [null]
    });

    this.requestForm.get('areas').valueChanges.subscribe(value => {
      if (value?.length < 1) this.requestForm.get('districts').disable();
      else this.requestForm.get('districts').enable();
    });

    this.requestForm.get('districts').valueChanges.subscribe(value => {
      if (value?.length < 1) this.requestForm.get('localities').disable();
      else this.requestForm.get('localities').enable();
    });

    this.requestForm.get('receivingMethod').valueChanges.subscribe(value => {
      if (value?.includes(1)) this.requestForm.get('email').enable();
      else this.requestForm.get('email').disable();
    });

    this.requestForm.get('startDateValue').valueChanges.subscribe(value => {
      this.requestForm.get('startDate').setValue(value ? value.toISOString() : null);
      const endDate = this.requestForm.get('endDateValue').value;
      if (endDate && value > endDate) this.requestForm.get('endDateValue').setValue(null);
    });

    this.requestForm.get('endDateValue').valueChanges.subscribe(value => {
      this.requestForm.get('endDate').setValue(value ? value.toISOString() : null);
    });
  }

  private assignUserData(): void {
    this.user = this.authenticationService.currentUserValue;
    this.request.citizenIdnp = this.authenticationService.currentUserValue.idnp;
  }

  private mapLocalities(): void {
    this.areas = this.allLocalities.map(r => ({
      value: r.areaId,
      label: r.areaName,
    } as SelectItem));

    this.districts = this.allLocalities.map(r => ({
      value: r.areaId,
      label: r.areaName,
      items: r.districts.map(d => ({
        value: d.districtId,
        label: d.districtName
      } as SelectItem))
    } as SelectItemGroup));

    this.allLocalities.forEach(r => this.localities.push(...r.districts.map(d => ({
      value: d.districtId,
      label: d.districtName,
      items: d.localities.map(l => ({
        value: l.localityId,
        label: l.localityName
      } as SelectItem))
    } as SelectItemGroup))));
  }
}
