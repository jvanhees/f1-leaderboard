import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TrackService } from './../../services/track.service';

import { Track } from './../../interfaces/track';

@Component({
  selector: 'track-selection',
  templateUrl: './track-selection.component.html',
  styleUrls: ['./track-selection.component.scss']
})
export class TrackSelectionComponent implements OnInit {

  tracks: Observable<Track[]>;
  upcomingTrack: Observable<Track>;
  svgs: SafeHtml[] = [];
  now: Date = new Date();

  constructor(
    private trackService: TrackService,
    private http: Http,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.tracks = this.trackService.getTracks();
    this.upcomingTrack = this.trackService.getUpcomingTrack();

    this.tracks.subscribe((data: Track[]) => {
      for (let track of data) {
        this.getTrackSvg(track.svg).subscribe((text: string) => {
          this.svgs[track.id] = this.sanitizer.bypassSecurityTrustHtml(text);
        });
      }
    });
  }

  getTrackSvg(url: string): Observable<string> {
    return this.http.get(url)
      .map((res: Response) => res.text());
  }

}
