import { NoteColorComponent } from './../note-color/note-color.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  keyString: string;
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {
  constructor(
    private db: AngularFireDatabase,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onDelete() {
    const itemsRef = this.db.list('/notes');
    itemsRef.remove(this.data.keyString).then(() => {
      this.dialogRef.close();
      this.openSnackBar('Deleted', 'Okay');
    });
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 2 * 1000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
