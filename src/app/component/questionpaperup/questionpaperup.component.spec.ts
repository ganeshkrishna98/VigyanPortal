import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpaperupComponent } from './questionpaperup.component';

describe('QuestionpaperupComponent', () => {
  let component: QuestionpaperupComponent;
  let fixture: ComponentFixture<QuestionpaperupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpaperupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpaperupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
