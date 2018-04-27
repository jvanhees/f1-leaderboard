import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
  unclaimedColumns = ['laptime', 'team', 'date', 'claim'];

  constructor(
    private route: ActivatedRoute,
    private timingService: TimingService,
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    this.timings = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.timingService.getTimingsByTrack(params.get('trackId'))
      });

    this.track = this.route.paramMap
      .switchMap((params: ParamMap) => this.trackService.getTrack(Number(params.get('trackId'))));

    this.claimedTimings = this.timings.map((timings: Timing[]) => {
      let filtered: Timing[] = [];
      for (let timing of timings) {
        if (timing.playerId) {
          filtered.push(timing);
        }
      }
      return filtered;
    });

    this.unclaimedTimings = this.timings.map((timings: Timing[]) => {
      let filtered: Timing[] = [];
      for (let timing of timings) {
        if (!timing.playerId) {
          filtered.push(timing);
        }
      }
      return filtered;
    });
  }

}
