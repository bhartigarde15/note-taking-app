import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  isLinear = false;
  noteDay;
  noteTime;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isSave = false;
  durationInSeconds = 2;
  message = 'Saved the note!!';
  action: 'Cancel';

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      header: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      content: ['', Validators.required],
    });
  }

  saveNote(stepper: MatStepper) {
    // console.log(this.firstFormGroup);
    const itemsRef = this.db.list('notes');
    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    this.noteDay = currentDate + '/' + currentMonth + '/' + currentYear;

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    this.noteTime = currentHours + ':' + currentMinutes;

    if (
      this.firstFormGroup.value.header != '' &&
      this.secondFormGroup.value.content != ''
    ) {
      itemsRef
        .push({
          title: this.firstFormGroup.value.header,
          content: this.secondFormGroup.value.content,
          day: this.noteDay,
          time: this.noteTime,
          color: 'lightblue',
          date: date,
        })
        .then((res) => console.log(res));
      this.isSave = true;
      this.openSnackBar(this.message, this.action);
    } else {
      this.openSnackBar('Please enter all fields', 'Okay');
      if (this.firstFormGroup.value.header == '') {
        stepper.previous();
        stepper.previous();
      } else stepper.previous();
    }

    // console.log(this.secondFormGroup);
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
