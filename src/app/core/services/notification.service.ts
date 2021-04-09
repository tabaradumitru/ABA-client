import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private messageService: MessageService
  ) {}


  private doToastMessage(type: string, summary: string, detail: string, sticky = false): void {
    this.messageService.add({severity: type, summary, detail, sticky});
  }

  callInfo(title: string, body: string, sticky = false): void {
    this.doToastMessage('info', title, body, sticky);
  }

  callWarning(title: string, body: string, sticky = false): void {
    this.doToastMessage('warn', title, body, sticky);
  }

  callError(title: string, body: string, sticky = false): void {
    this.doToastMessage('error', title, body, sticky);
  }

  callErrors(title: string, body: any[], sticky = false): void {
    body.forEach(element => {
      this.doToastMessage('error', title, element.message, sticky);
    });
  }

  callSuccess(title: string, body: string, sticky = false): void {
    this.doToastMessage('success', title, body, sticky);
  }

  notifyHttpErrors(error: HttpErrorResponse): void {
    if (this.arrayHasValues(error.error?.errors)) {
      error.error?.errors.map(err => this.callError('Error', err.message));
    }
  }

  arrayHasValues = (arr: any[]) => {
    return Array.isArray(arr) && arr.length > 0;
  }
}
