import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaderboardComponent } from './../pages/leaderboard/leaderboard.component';
import { TracksComponent } from './../pages/tracks/tracks.component';
import { UserComponent } from './../pages/user/user.component';

import { AuthGuard } from './../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tracks',
    component: TracksComponent,
  },
  {
    path: 'track',
    redirectTo: '/tracks',
    pathMatch: 'full'
  },
  {
    path: 'track/:trackId',
    component: LeaderboardComponent,
  },
  {
    path: 'user/:userId',
    component: UserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
