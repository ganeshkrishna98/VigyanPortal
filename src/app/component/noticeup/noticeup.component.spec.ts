import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeupComponent } from './noticeup.component';

describe('NoticeupComponent', () => {
  let component: NoticeupComponent;
  let fixture: ComponentFixture<NoticeupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
