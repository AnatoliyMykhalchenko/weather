import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  consoleMessage(message, data?: any, color: string = 'green'): void {
    console.log(`%c ${message}`, `color: ${color}`, data || '');
  }
}
