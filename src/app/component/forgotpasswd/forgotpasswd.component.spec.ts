import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswdComponent } from './forgotpasswd.component';

describe('ForgotpasswdComponent', () => {
  let component: ForgotpasswdComponent;
  let fixture: ComponentFixture<ForgotpasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
