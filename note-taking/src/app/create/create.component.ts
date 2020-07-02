import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
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

  saveNote() {
    console.log(this.firstFormGroup.value.header);
    const itemsRef = this.db.list('notes');
    itemsRef.push({
      header: this.firstFormGroup.value.header,
      content: this.secondFormGroup.value.content,
    });
    // console.log(this.secondFormGroup);
  }
}
