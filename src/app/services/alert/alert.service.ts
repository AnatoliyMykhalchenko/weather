import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './alert.component';
import { AlertData } from './alert.types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly dialog: MatDialog) {}

  show(options?: AlertData) {
    this.dialog.open(AlertComponent, {
      panelClass: 'custom-dialog',
      width: '300px',
      height: 'auto',
      data: options,
    });
  }
}
