import { ReportChartModule } from './report-chart.module';

describe('ReportChartModule', () => {
  let reportChartModule: ReportChartModule;

  beforeEach(() => {
    reportChartModule = new ReportChartModule();
  });

  it('should create an instance', () => {
    expect(reportChartModule).toBeTruthy();
  });
});
