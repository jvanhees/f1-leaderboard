import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';

import { TrackService } from './../../services/track.service';
import { TimingService } from './../../services/timing.service';

import { Track } from './../../interfaces/track';
import { Timing } from './../../interfaces/timing';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {


  timings: Observable<Timing[]>;
  claimedTimings: Observable<Timing[]>;
  unclaimedTimings: Observable<Timing[]>;
  track: Observable<Track>;
  unclaimedColumns = ['date', 'laptime', 'team', 'claim'];

  pageLength = 20;

  constructor(
    private route: ActivatedRoute,
    private timingService: TimingService,
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    this.getTimings();

    this.track = this.route.paramMap
      .switchMap((params: ParamMap) => this.trackService.getTrack(Number(params.get('trackId'))));
  }

  public getTimings(start = 0, end = 20) {
    this.timings = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.timingService.getTimingsByTrack(params.get('trackId'), start, end)
      });
  }

  public getUnclaimed() {
    this.unclaimedTimings = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.timingService.getUnclaimedByTrack(params.get('trackId'))
      });
  }

  public pageChange(page: PageEvent) {
    const start = page.pageIndex;
    const end = page.pageSize * (page.pageIndex + 1);
    this.getTimings(start, end);
  }

}
