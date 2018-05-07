import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Player } from './../../interfaces/player';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public player: Observable<Player>;
  public loggedIn: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.player = this.userService.getPlayer();
    this.loggedIn = this.userService.isAuthenticated();

    console.log(this.route.snapshot);
    if (this.route.snapshot.paramMap.get('userId') === 'new') {
      console.log('new user');
    }
  }

  login() {
    this.userService.login();
  }

  public logout() {
    this.userService.logout().then(ret => {
      this.router.navigate(['/']);
    });
  }

}
