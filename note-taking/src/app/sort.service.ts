import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  temp: any;
  recent: any;
  constructor(private db: AngularFireDatabase) {
    this.sortNotesByTime();
  }

  sortNotesByTime() {
    this.db
      .list('/notes')
      .snapshotChanges()
      .subscribe((items) => {
        this.temp = items;
        this.temp.sort(
          (a, b) =>
            a.payload.val().day.localeCompare(b.payload.val().day) ||
            a.payload.val().time.localeCompare(b.payload.val().time)
        );
        this.temp.reverse();
        this.recent = this.temp[0];

        console.log(this.recent);
      });
  }
}
