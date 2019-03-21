import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSentComponent } from './trading.component';

describe('TradingComponent', () => {
  let component: ReportSentComponent;
  let fixture: ComponentFixture<ReportSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
