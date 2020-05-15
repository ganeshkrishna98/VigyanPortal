import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoupComponent } from './videoup.component';

describe('VideoupComponent', () => {
  let component: VideoupComponent;
  let fixture: ComponentFixture<VideoupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
