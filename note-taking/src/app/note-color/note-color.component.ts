import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  key: string;
  color: string;
}

@Component({
  selector: 'app-note-color',
  templateUrl: './note-color.component.html',
  styleUrls: ['./note-color.component.css'],
})
export class NoteColorComponent implements OnInit {
  currentColor;
  colors = [
    { value: 'lightgreen', viewValue: 'Green' },
    { value: 'Aquamarine', viewValue: 'Aquamarine' },
    { value: 'yellow', viewValue: 'Yellow' },
    { value: 'orange', viewValue: 'Orange' },
    { value: 'white', viewValue: 'White' },
    { value: 'hotpink', viewValue: 'Pink' },
    { value: 'PeachPuff	', viewValue: 'Peach' },
  ];
  constructor(
    private db: AngularFireDatabase,
    public dialogRef: MatDialogRef<NoteColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateColor() {
    const itemsRef = this.db.list('/notes');

    console.log('Color=' + this.currentColor);

    this.db.database
      .ref('/notes')
      .child(this.data.key)
      .update({
        color: this.data.color,
      })
      .then(() => console.log('updated'));
  }

  selected(event) {
    console.log(event.value);

    this.data.color = event.value;
  }
}
