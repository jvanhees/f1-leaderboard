import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'laptime'
})
export class LaptimePipe implements PipeTransform {

  transform(value: number): string {
    var duration = moment.duration(value, 'seconds');
    return moment.utc(duration.asMilliseconds()).format("mm:ss.SSS");
  }

}
