import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeaderboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
