import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';

import { Timing } from './../interfaces/timing';
import { Player } from './../interfaces/player';

import { CarService, IndexedCars } from './car.service';
import { TrackService, IndexedTracks } from './track.service';
import { PlayerService, IndexedPlayers } from './player.service';

@Injectable()
export class TimingService {

  private timingsCollection: AngularFirestoreCollection<Timing>;

  constructor(
    private afs: AngularFirestore,
    private carService: CarService,
    private trackService: TrackService,
    private playerService: PlayerService
  ) {
    this.timingsCollection = afs.collection<Timing>('timings');
  }

  public getTimingsByTrack(trackId: string, start = 0, end = 20): Observable<Timing[]> {
    const trackDoc = this.trackService.getTrackDoc(trackId);
    const timings = this.afs.collection<Timing>('timings', ref => ref
      .where('track', '==', trackDoc.ref)
      .orderBy('laptime')
    ).snapshotChanges().map(this.mapTimingSnapshot);
    return this.enrichTimings(timings);
  }

  public getUnclaimedByTrack(trackId: string, daysAgo: number = 3): Observable<Timing[]> {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysAgo);

    const trackDoc = this.trackService.getTrackDoc(trackId);
    const timings = this.afs.collection<Timing>('timings', ref => ref
      .where('track', '==', trackDoc.ref)
      .where('playerId', '==', null)
      .where('time', '>=', fromDate)
      .orderBy('time')
    ).snapshotChanges().map(this.mapTimingSnapshot);
    return this.enrichTimings(timings);
  }

  getTimingDoc(timingId: string): AngularFirestoreDocument<Timing> {
    return this.timingsCollection.doc<Timing>(timingId);
  }

  public enrichTimings(timings: Observable<Timing[]>): Observable<Timing[]> {
    return combineLatest(
      timings,
      this.carService.getIndexedCars(),
      this.trackService.getIndexedTracks(),
      this.playerService.getIndexedPlayers(),
      (timings: Timing[], indexedCars: IndexedCars, indexedTracks: IndexedTracks, indexedPlayers: IndexedPlayers) => {
        timings.forEach((timing, idx) => {
          timing.car = indexedCars[timing.car.id];
          timing.track = indexedTracks[timing.track.id];
          if (timing.playerId) {
            timing.player = indexedPlayers[timing.playerId];
          }
          if (idx > 0) {
            timing.gap = timing.laptime - timings[0].laptime;
          } else {
            timing.gap = 0;
          }
        });
        return timings;
      }
    );
  }

  public setPlayerOfTiming(timing: Timing, player: Player): Promise<void> {
    const timingDoc = this.getTimingDoc(timing.id);
    return timingDoc.update({ playerId: player.id });
  }

  public getTimingByReadableId(timingId: string): Observable<Timing[]> {
    const timings = this.afs.collection<Timing>('timings', ref => ref
      .where('id', '==', timingId)
    ).snapshotChanges().map(this.mapTimingSnapshot);
    return this.enrichTimings(timings);
  }

  private mapTimingSnapshot(actions: DocumentChangeAction[]): Timing[] {
    return actions.map(a => {
      const data = a.payload.doc.data() as Timing;
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  }

}
