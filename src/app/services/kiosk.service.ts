import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Telemetry } from './../interfaces/telemetry';

export interface ClientList {
  [key: string]: Telemetry;
}

@Injectable()
export class KioskService {

  clients: Observable<ClientList>;
  activeClient: string = null;
  activeClientSubject: BehaviorSubject<string>;

  constructor(private db: AngularFireDatabase) {
    this.clients = db.object<ClientList>('clients').valueChanges();
    this.activeClientSubject = new BehaviorSubject('');
    this.activeClientSubject.subscribe(client => {
      this.activeClient = client;
    });
  }

  public getClients(): Observable<string[]> {
    return this.clients.map(clients => {
      return Object.keys(clients);
    });
  }

  public selectClient(client: string): void {
    this.activeClientSubject.next(client);
  }

  public getActiveClient(): Observable<string> {
    return this.activeClientSubject;
  }

  public isKiosk(): Observable<boolean> {
    return this.activeClientSubject.map((client) => {
      return client !== '';
    });
  }



}
