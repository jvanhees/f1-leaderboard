import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';

import { Track } from './../interfaces/track'

export interface IndexedTracks { [id: string]: Track };

@Injectable()
export class TrackService {

  private trackCollection: AngularFirestoreCollection<Track>;

  constructor(private afs: AngularFirestore) {
    this.trackCollection = afs.collection<Track>('tracks', ref => ref.orderBy('date'));
  }

  getIndexedTracks(): Observable<IndexedTracks> {
    return this.getTracks().map(tracks => {
      let indexedTracks: IndexedTracks = {};
      for (let track of tracks) {
        indexedTracks[track.id] = track;
      }
      return indexedTracks;
    });
  }

  getTracks(): Observable<Track[]> {
    return this.trackCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Track;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getTrack(trackId: number): Observable<Track> {
    return this.getIndexedTracks().map(tracks => {
      return tracks[trackId];
    });
  }

  getTrackDoc(trackId:  string): AngularFirestoreDocument<Track> {
    return this.trackCollection.doc<Track>(trackId);
  }

  getUpcomingTrack(): Observable<Track> {
    return this.getTracks().map(tracks => {
      let now = new Date();
      let latest: Track;
      for (let track of tracks) {
        if (track.date > now && (!latest || track.date < latest.date)) {
          latest = track;
        }
      }
      return latest;
    });
  }

}
