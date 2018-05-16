import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TimingService } from './../../services/timing.service';

import { Timing } from './../../interfaces/timing';

import generate = require('nanoid/generate');

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  timing: Observable<Timing>;
  id: string;
  exists = true;

  constructor(
    private route: ActivatedRoute,
    private timingService: TimingService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.timing = this.timingService.getTimingByReadableId(params.get('timingId')).map((timings: Timing[]) => {
        return timings[0];
      });
    });

    this.timing.subscribe((timing: Timing) => {
      if (typeof timing === 'undefined') {
        this.exists = false;
      } else {
        this.exists = true;
      }
    });
  }

}
