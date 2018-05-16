import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Timing } from './../../interfaces/timing';

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

  constructor(
  ) { }

  ngOnInit() {
  }

  trackBy(index, item) {
    return item.id;
  }

}
