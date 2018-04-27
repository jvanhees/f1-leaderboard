import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';

import { Player } from './../interfaces/player';

import { PlayerService } from './../services/player.service';

import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  private authState: any = null;
  private playerDoc: AngularFirestoreDocument<Player>;
  private player: Observable<Player>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private playerService: PlayerService
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.authState = auth;
      }
    });
  }

  // Returns true if user is logged in
  public isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.map(value => {
      return (value !== null)
    });
  }

  // Returns current user data
  public getPlayer(): Observable<Player> {
    return this.afAuth.authState.switchMap((authState) => {
      return this.playerService.getPlayer(authState.uid);
    });
  }

  public getStateObservable() {
    return this.afAuth.authState;
  }

  public login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          this.playerDoc = this.playerService.getPlayerDoc(this.authState.uid);
          this.updateUserData()
      })
      .catch(error => console.log(error));;
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  private updateUserData(): void {
    let data: Player = {
      email: this.authState.email,
      name: this.authState.displayName,
      photo: this.authState.photoURL
    }
    this.playerDoc.update(data);
  }

}
