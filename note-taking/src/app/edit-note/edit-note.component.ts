import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortService } from '../sort.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
})
export class EditNoteComponent implements OnInit {
  @Input() key: string;
  public editorContent: string = "My Document's Title";

  temp;
  form1;
  form2;
  isSave = false;
  onButtonClick = false;
  noteDay: string;
  noteTime: string;
  title: string;
  content: string;
  title1: string;
  content1: string;

  durationInSeconds = 2;
  message = 'Successfully Edited the note!';
  action = 'Okay';

  constructor(
    private db: AngularFireDatabase,
    private sortService: SortService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
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

    console.log(this.editorContent);
  }

  ngOnInit(): void {
    this.form1 = this._formBuilder.group({
      title: ['', Validators.required],
    });
    this.form2 = this._formBuilder.group({
      content: ['', Validators.required],
    });
  }

  onUpdate(key: string) {
    const itemsRef = this.db.list('/notes');

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
        this.sortService.sortNotesByTime();
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

  displayContent(ec) {
    console.log('Changed!' + ec);
  }

  onUpdateTitle(key: string) {
    console.log(this.form1.value.title);

    const itemsRef = this.db.list('/notes');

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
        title: this.form1.value.title,
        day: this.noteDay,
        time: this.noteTime,
        date: date,
      })
      .then(() => {
        console.log('updated');
        this.isSave = true;
        this.openSnackBar(this.message, this.action);
        this.sortService.sortNotesByTime();
      });
  }

  onUpdateContent(key: string) {
    console.log(this.form2.value.content);

    const itemsRef = this.db.list('/notes');

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
        content: this.form2.value.content,
        day: this.noteDay,
        time: this.noteTime,
        date: date,
      })
      .then(() => {
        console.log('updated');
        this.isSave = true;
        this.openSnackBar(this.message, this.action);
        this.sortService.sortNotesByTime();
      });
  }
}
