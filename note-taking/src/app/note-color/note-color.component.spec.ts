import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteColorComponent } from './note-color.component';

describe('NoteColorComponent', () => {
  let component: NoteColorComponent;
  let fixture: ComponentFixture<NoteColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
