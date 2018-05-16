import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KioskService } from './../../services/kiosk.service';
import { UserService } from './../../services/user.service';
import { TimingService } from './../../services/timing.service';

import { Timing } from './../../interfaces/timing';
import { Player } from './../../interfaces/player';

@Component({
  selector: 'claim-time',
  templateUrl: './claim-time.component.html',
  styleUrls: ['./claim-time.component.scss']
})
export class ClaimTimeComponent implements OnInit {

  @Input('timing')
  public timing: Timing;

  @Input('raised')
  public raised = false;

  isAuthenticated: Observable<boolean>;
  isKiosk: Observable<boolean>;

  constructor(
    private userService: UserService,
    private kioskService: KioskService,
    private timingService: TimingService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isKiosk = this.kioskService.isKiosk();
  }

  public claimTime(): void {
    this.userService.getPlayer().subscribe((player: Player) => {
      this.timingService.setPlayerOfTiming(this.timing, player).then(() => {
        this.changeDetectorRefs.detectChanges();
      });
    });
  }

  public loginClaimTime(): void {
    this.userService.login().then((credentials) => {
      this.claimTime();
    });
  }

  public kioskClaimTime(timing: Timing): void {
    console.log('kiosk');
  }

}
