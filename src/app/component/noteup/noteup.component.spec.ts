import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteupComponent } from './noteup.component';

describe('NoteupComponent', () => {
  let component: NoteupComponent;
  let fixture: ComponentFixture<NoteupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
