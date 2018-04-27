import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';

import { Player } from './../interfaces/player'

export interface IndexedPlayers { [id: string]: Player };

@Injectable()
export class PlayerService {

  private playerCollection: AngularFirestoreCollection<Player>;

  constructor(private afs: AngularFirestore) {
    this.playerCollection = afs.collection<Player>('players');
  }

  public getIndexedPlayers(): Observable<IndexedPlayers> {
    return this.getPlayers().map(players => {
      let indexedPlayers: IndexedPlayers = {};
      for (let player of players) {
        indexedPlayers[player.id] = player;
      }
      return indexedPlayers;
    });
  }

  public getPlayers(): Observable<Player[]> {
    return this.playerCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public getPlayer(playerId: string): Observable<Player> {
    return this.getIndexedPlayers().map(players => {
      return players[playerId];
    });
  }

  public getPlayerDoc(playerId:  string): AngularFirestoreDocument<Player> {
    return this.playerCollection.doc<Player>(playerId);
  }

}
