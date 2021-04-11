import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, SelectItemGroup } from 'primeng/api';
import { CustomRequest } from '@models/request/customRequest';
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
import { ReceivingMethodService } from '@services/data/receiving-method.service';
import { ReceivingMethod } from '@models/receiving-method/receiving-method';
import { ReceivingMethods } from '@constants/enums';
import { RequestToAdd } from '@models/request/request-to-add';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request-dialog.component.html',
  styleUrls: ['./new-request-dialog.component.scss']
})
export class NewRequestDialogComponent implements OnInit {

  loadingConstant = NEW_REQUEST;
  receivingMethods: ReceivingMethod[] = [];
  activities: Activity[] = [];
  allLocalities: Area[];
  areas: SelectItem[] = [];

  districts: SelectItemGroup[] = [];
  localities: SelectItemGroup[] = [];

  startDate: Date;
  endDate: Date;

  requestForm: FormGroup;

  user: User = {} as User;

  constructor(private activityService: ActivityService,
              private localityService: LocalityService,
              private requestService: RequestService,
              private receivingMethodService: ReceivingMethodService,
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
    const $receivingMethods = this.receivingMethodService.getReceivingMethods();

    forkJoin([$activities, $localities, $receivingMethods]).subscribe(response => {
      this.activities = response[0];
      this.allLocalities = response[1];
      this.receivingMethods = response[2];
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
    // const dataToSend = { ...this.requestForm.value } as CustomRequest;
    // console.log(dataToSend);
    this.requestService.addRequest({ ...this.requestForm.value } as RequestToAdd).subscribe(() => {
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
      activityId: [null, Validators.required],
      startDate: [null, Validators.required],
      startDateValue: [null, Validators.required], // will be ignored at data send
      endDate: [null, Validators.required],
      endDateValue: [null, Validators.required], // will be ignored at data send
      phone: [null, Validators.required],
      email: [ null ],
      notifyExpiry: [0],
      personalDataAgreement: [false, Validators.requiredTrue],
      obeyLawAgreement: [false, Validators.requiredTrue],
      areas: [[], Validators.required],
      districts: [{ value: [], disabled: true }, Validators.required],
      localities: [{ value: [], disabled: true }, Validators.required],
      note: [null]
    });

    this.requestForm.get('areas').valueChanges.subscribe(value => {
      if (value?.length < 1) this.requestForm.get('districts').disable();
      else this.requestForm.get('districts').enable();
    });

    this.requestForm.get('districts').valueChanges.subscribe(value => {
      if (value?.length < 1) this.requestForm.get('localities').disable();
      else this.requestForm.get('localities').enable();
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
  }

  onChangeNotifyExpiry(checked: boolean): void {
    this.requestForm.get('notifyExpiry').setValue(checked ? 1 : 0);
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

  get ReceivingMethods(): typeof ReceivingMethods {
    return ReceivingMethods;
  }
}
