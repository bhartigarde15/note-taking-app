import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
})
export class EditNoteComponent implements OnInit {
  @Input() key: string;

  temp;
  isSave = false;
  onButtonClick = false;
  noteDay: string;
  noteTime: string;
  title: string;
  content: string;

  durationInSeconds = 2;
  message = 'Successfully Edited the note!';
  action = 'Okay';

  constructor(private db: AngularFireDatabase, private _snackBar: MatSnackBar) {
    this.db
      .list('/notes/')
      .snapshotChanges()
      .subscribe((items) => {
        this.temp = items;
        for (let t of this.temp) {
          if (t.key === this.key) {
            this.title = t.payload.val().title;
            this.content = t.payload.val().content;
          }
        }
      });
  }

  ngOnInit(): void {}

  onUpdate(key: string) {
    const itemsRef = this.db.list('/notes');

    console.log('title=' + this.title);
    console.log('content=' + this.content);

    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    this.noteDay = currentDate + '/' + currentMonth + '/' + currentYear;

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    this.noteTime = currentHours + ':' + currentMinutes;
    this.db.database
      .ref('/notes')
      .child(key)
      .update({
        title: this.title,
        content: this.content,
        day: this.noteDay,
        time: this.noteTime,
        date: date,
      })
      .then(() => {
        console.log('updated');
        this.isSave = true;
        this.openSnackBar(this.message, this.action);
      });
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onBack() {
    this.onButtonClick = true;
  }
}
