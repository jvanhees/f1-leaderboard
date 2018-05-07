import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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

  @Input('pageSize')
  public pageSize: number = null;

  @Input('length')
  public length: number;

  @Output('pagination')
  public paginationEvent: EventEmitter<PageEvent> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  gaps: number[];
  isAuthenticated: Observable<boolean>;

  constructor(
    private userService: UserService,
    private timingService: TimingService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.paginator.page;
  }

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

  public loginClaimTime(timing: Timing): void {
    this.userService.login().then((credentials) => {
      this.claimTime(timing);
    });
  }

}
