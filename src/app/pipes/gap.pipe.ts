import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'gap'
})
export class GapPipe implements PipeTransform {

  transform(value: number): string {
    var duration = moment.duration(value, 'seconds');
    return moment.utc(duration.asMilliseconds()).format("+s.SSS") + 's';
  }

}
