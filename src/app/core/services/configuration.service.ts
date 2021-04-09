import { Injectable } from '@angular/core';
import * as LOADING_CONSTANTS from '@constants/loading-constants';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _isLoadingComponent = {};

  constructor() {
    for (const key in LOADING_CONSTANTS) {
      this._isLoadingComponent[LOADING_CONSTANTS[key]] = false;
    }
  }

  getLoading = (component: string): boolean =>  {
    return this._isLoadingComponent[component];
  }

  setLoading = (value: boolean, component: string) => {
    this._isLoadingComponent[component] = value;
  }
}
