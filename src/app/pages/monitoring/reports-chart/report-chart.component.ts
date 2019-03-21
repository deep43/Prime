import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent implements OnInit {
  /*Bar chart Start*/
  type1 = 'bar';
  data1 = {
    labels: ['Today, Feb 5, 2019'],
    datasets: [
      {
      label: 'Sent',
      backgroundColor: [
        '#9ccc65',
      ],
      hoverBackgroundColor: [
        '#9ccc6570',
      ],
      data: [175],
    }, {
      label: 'Pending',
      backgroundColor: [
        '#ff5252',
      ],
      hoverBackgroundColor: [
        '#ff525270',
      ],
      data: [25],
    }]
  };

  type2 = 'bar';
  data2 = {
    labels: ['Mon Feb 4, 2019', 'Fri Feb 1, 2019', 'Thurs Jan 31, 2019', 'Wed Jan 30, 2019'],
    datasets: [{
      label: 'Sent',
      backgroundColor: [
        '#9ccc65', '#9ccc65', '#9ccc65', '#9ccc65',
      ],
      hoverBackgroundColor: [
        '#9ccc6570', '#9ccc6570', '#9ccc6570', '#9ccc6570',
      ],
      data: [175, 160, 190, 120],
    }, {
      label: 'Pending',
      backgroundColor: [
        '#ff5252', '#ff5252', '#ff5252', '#ff5252',
      ],
      hoverBackgroundColor: [
        '#ff525270', '#ff525270', '#ff525270', '#ff525270',
      ],
      data: [25, 30, 40, 30],
    }]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: function () {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fontColor = 'black';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            const data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    title: {
      display: true,
      fontSize: 14,
      text: 'Reporting Stats'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          fontSize: 14,
          fontStyle: 'bold',
          fontFamily: '"Open Sans", sans-serif',
          labelString: 'Number Of Reports'
        }
      }]
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
