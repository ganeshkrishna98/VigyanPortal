import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthpopComponent } from './authpop.component';

describe('AuthpopComponent', () => {
  let component: AuthpopComponent;
  let fixture: ComponentFixture<AuthpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
