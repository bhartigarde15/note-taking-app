import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoteColorComponent } from './note-color/note-color.component';
import { MatSelectModule } from '@angular/material/select';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ConfirmDialog } from './home/confirm-dialog';

// import {} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    ConfirmDialog,
    NoteColorComponent,
    EditNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatRippleModule,
    CommonModule,
    MatTooltipModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDPDDMyUpqgipeoMHof3AIH1jEyZOQ1qRI',
      authDomain: 'note-taking-bb854.firebaseapp.com',
      databaseURL: 'https://note-taking-bb854.firebaseio.com',
      projectId: 'note-taking-bb854',
      storageBucket: 'note-taking-bb854.appspot.com',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
