import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { cadetblue } from 'color-name';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').filter(item => item.includes(':')).join('');
  }
}
