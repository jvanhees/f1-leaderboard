import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Telemetry } from './../interfaces/telemetry';

export interface ClientList {
  [key: string]: Telemetry;
}

@Injectable()
export class KioskService {

  clients: Observable<ClientList>;
  activeClient: string = null;

  constructor(private db: AngularFireDatabase) {
    this.clients = db.object<ClientList>('clients').valueChanges();;
  }

  public getClients(): Observable<string[]> {
    return this.clients.map(clients => {
      return Object.keys(clients);
    });
  }

  public selectClient(client: string): void {
    this.activeClient = client;
  }

  public getActiveClient(): string {
    return this.activeClient;
  }



}
