import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@constants/enums';
import { User } from '@models/auth/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setCurrentUser(token: string): void {
    localStorage.setItem(LocalStorageKeys.USER, token);
  }

  getCurrentUserAsString = (): string => localStorage.getItem(LocalStorageKeys.USER);

  getCurrentUserAsObject = (): User => JSON.parse(this.getCurrentUserAsString()) as User;

  removeCurrentUser(): void {
    localStorage.removeItem(LocalStorageKeys.USER);
  }
}
