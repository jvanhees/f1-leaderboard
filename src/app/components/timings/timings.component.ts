import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TimingService } from './../../services/timing.service';
import { UserService } from './../../services/user.service';

import { Timing } from './../../interfaces/timing';
import { Player } from './../../interfaces/player';

@Component({
  selector: 'timings',
  templateUrl: './timings.component.html',
  styleUrls: ['./timings.component.scss']
})
export class TimingsComponent implements OnInit {

  @Input('data')
  public timings: Observable<Timing[]>;

  @Input('columns')
  public displayedColumns: string[] = ['position', 'teamcolor', 'name', 'laptime', 'gap', 'team', 'date'];

  gaps: number[];

  constructor(
    private userService: UserService,
    private timingService: TimingService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  trackBy(index, item) {
    return item.id;
  }

  public claimTime(timing: Timing): void {
    this.userService.getPlayer().subscribe((player: Player) => {
      this.timingService.setPlayerOfTiming(timing, player).then(() => {
        this.changeDetectorRefs.detectChanges();
      });
    });
  }

}
