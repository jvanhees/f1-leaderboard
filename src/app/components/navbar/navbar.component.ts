import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../../services/user.service';
import { KioskService } from './../../services/kiosk.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: Observable<boolean>;

  clients: Observable<string[]>;
  activeClient: string;

  constructor(
    private userService: UserService,
    private kioskService: KioskService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.clients = this.kioskService.getClients();
  }

  public login() {
    this.userService.login();
  }

  public selectLiveClient(client: string) {
    this.kioskService.selectClient(client);
    this.activeClient = this.kioskService.getActiveClient();
  }

}
