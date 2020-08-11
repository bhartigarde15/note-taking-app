import { NoteColorComponent } from './../note-color/note-color.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from './confirm-dialog';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  keyString: string;
}

//
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temp;
  data;
  key;
  title;
  content;
  recent;
  hasDeleted = false;
  message = 'Successfully deleted the note!';
  action = 'Ok';
  durationInSeconds = 2;
  isEdit = false;
  dialogData = [];

  noteDay: string;
  noteTime: string;

  constructor(
    private db: AngularFireDatabase,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
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

        this.recent = [
          {
            key: this.temp[0].payload.key,
            title: this.temp[0].payload.val().title,
            content: this.temp[0].payload.val().content,
            day: this.temp[0].payload.val().day,
            time: this.temp[0].payload.val().time,

            color: this.temp[0].payload.val().color,
          },
        ];
      });
  }

  ngOnInit(): void {
    let date = new Date();

    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    this.noteDay = currentDate + '/' + currentMonth + '/' + currentYear;

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    this.noteTime = currentHours + ':' + currentMinutes;

    console.log('date=' + this.noteDay);
  }

  deleteNote(key: string) {
    console.log(key);
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { keyString: key },
    });
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  editNote(key: string) {
    this.isEdit = true;
    this.key = key;
    // const dialogRef = this.dialog.open(EditComponent, {
    //   data: { title: this.title, content: this.content, key: key },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed with result= ');
    //   // result = result.map((value) => value);
    //   // let values = Object.keys(result).map((key) => result[key]);
    //   // this.title = values[0];
    //   // this.content = values[1];
    //   // console.log(this.title);
    //   // console.log(this.content);
    // });
  }

  setBackgroundColor(key: string) {
    const dialogRef = this.dialog.open(NoteColorComponent, {
      data: { color: 'lightblue', key: key },
    });
  }
}
