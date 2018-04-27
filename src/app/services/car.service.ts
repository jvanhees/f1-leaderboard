import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

import { Car } from './../interfaces/car'

export interface IndexedCars { [id: string]: Car };

@Injectable()
export class CarService {

  private carCollection: AngularFirestoreCollection<Car>;

  cars: Observable<Car[]>;
  indexedCars: Observable<IndexedCars>

  constructor(private afs: AngularFirestore) {
    this.carCollection = afs.collection<Car>('cars');
  }

  getIndexedCars(): Observable<IndexedCars> {
    return this.getCars().map(cars => {
      let indexedCars: IndexedCars = {};
      for (let car of cars) {
        indexedCars[car.id] = car;
      }
      return indexedCars;
    });
  }

  getCars(): Observable<Car[]> {
    return this.carCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Car;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getCar(car_id: string): Observable<Car> {
    return this.getIndexedCars().map(cars => {
      return cars[car_id];
    });
  }

}
