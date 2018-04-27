import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'ngx-moment';

import { ThemeModule } from './theme/theme.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { CarService } from './services/car.service';
import { TrackService } from './services/track.service';
import { TimingService } from './services/timing.service';
import { UserService } from './services/user.service';
import { PlayerService } from './services/player.service';

import { AppComponent } from './app.component';

import { TrackSelectionComponent } from './components/track-selection/track-selection.component';
import { TimingsComponent } from './components/timings/timings.component';

import { LaptimePipe } from './pipes/laptime.pipe';
import { GapPipe } from './pipes/gap.pipe';

import { environment } from '../environments/environment';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    LaptimePipe,
    GapPipe,
    TrackSelectionComponent,
    TracksComponent,
    UserComponent,
    TimingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ThemeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MomentModule
  ],
  providers: [
    CarService,
    TrackService,
    TimingService,
    UserService,
    PlayerService
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
