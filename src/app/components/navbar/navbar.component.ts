import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../../services/user.service';
import { KioskService } from './../../services/kiosk.service';

import { Player } from './../../interfaces/player';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: Observable<boolean>;

  clients: Observable<string[]>;
  activeClient: Observable<string>;
  isKiosk: Observable<boolean>;
  currentUser: Observable<Player>;

  constructor(
    private userService: UserService,
    private kioskService: KioskService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.currentUser = this.userService.getPlayer();
    this.clients = this.kioskService.getClients();
    this.isKiosk = this.kioskService.isKiosk();
    this.activeClient = this.kioskService.getActiveClient();
  }

  public login() {
    this.userService.login();
  }

  public selectLiveClient(client: string) {
    this.kioskService.selectClient(client);
  }

}
