import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPendingComponent } from './trading.component';

describe('TradingComponent', () => {
  let component: ReportPendingComponent;
  let fixture: ComponentFixture<ReportPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
