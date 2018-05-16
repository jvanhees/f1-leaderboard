import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sector'
})
export class SectorPipe implements PipeTransform {

  transform(value: number): string {
    const duration = moment.duration(value, 'seconds');
    return moment.utc(duration.asMilliseconds()).format("ss.S");
  }

}
