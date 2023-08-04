import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { defaultsDeep, isString, split } from 'lodash-es';
import { handleCallbackFunctions } from '../utils/chart';

@Component({
  selector: 'app-stat-graph-card',
  templateUrl: './stat-graph-card.component.html',
  styleUrls: ['./stat-graph-card.component.scss'],
})
export class StatGraphCardComponent implements AfterViewInit {
  @ViewChild('lineChartCanvas', { static: true }) canvas: ElementRef;

  chartStyle = {};
  dataAbsent = false;
  @Input() chartData = {
    labels: [],
    stat: {
      value: '',
      showSeparateUnit: false,
      unitLessValue: '',
      unit: '',
    },
    datasets: [],
    url: '',
    chartStyle: {},
    dataPresent: false,
    chartOptions: {},
    title: '',
    subtitle: '',
    info: '',
    dataAbsentText: '',
  };

  showFullValue = true;

  public lineChartDatasets: ChartConfiguration<'line'>['data']['datasets'] = [
    {
      data: [],
    },
  ];
  public lineChartLabels: ChartConfiguration<'line'>['data']['labels'] = [];
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {};
  lineChartPlugins: ChartConfiguration<'line'>['plugins'] = [ChartDataLabels];

  openURL() {
    window.open(this.chartData.url, '_blank');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Set Chart Style
      this.chartStyle = this.chartData.chartStyle || {};

      // Decide stat unit
      if (this.chartData.stat.value && this.chartData.stat.showSeparateUnit) {
        const fullValue = this.chartData.stat.value;
        try {
          this.chartData.stat.unitLessValue = fullValue.match(/[.0-9]+/)[0];
          this.chartData.stat.unit = fullValue
            .replace(this.chartData.stat.unitLessValue, '')
            .trim();
          this.showFullValue = false;
        } catch (e) {
          console.log(e);
        }
      }

      // Check if data is ProgressEvent, else stop processing further
      if (this.chartData.hasOwnProperty('dataPresent')) {
        if (!this.chartData.dataPresent) {
          this.dataAbsent = true;
          this.chartStyle = {
            display: 'none',
          };
          return;
        }
      }

      this.setUpData();
      this.setUpOptions();
    });
  }

  setUpData = () => {
    // Default colors for datasets
    let defaultLineChartDatasets: ChartConfiguration<'line'>['data']['datasets'] =
      [
        {
          data: [],
          backgroundColor: '#305096-#30509615',
          borderColor: '#19a9e1',
          pointBackgroundColor: 'rgb(80,147,248)',
          tension: 0.4,
        },
      ];

    // Merge the default datasets with user input and delete excess datasets
    this.lineChartDatasets = defaultsDeep(
      this.chartData.datasets,
      defaultLineChartDatasets
    );

    // Set labels if needed
    this.lineChartLabels = this.chartData.labels;

    // Create gradient background colors for datasets
    this.lineChartDatasets.forEach((dataset, index) => {
      if (isString(dataset.backgroundColor)) {
        let colors = split(dataset.backgroundColor, '-');
        if (colors.length > 1) {
          const gradient = this.canvas?.nativeElement
            .getContext('2d')
            .createLinearGradient(0, 0, 0, this.canvas?.nativeElement?.height);
          colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color);
          });

          this.lineChartDatasets[index].backgroundColor = gradient;
        }
      }
    });
  };
  setUpOptions = () => {
    // Default configuration for line chart
    let defaultLineChartOptions: ChartConfiguration<'line'>['options'] = {
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
      },
      plugins: {
        datalabels: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          position: 'average',
          titleAlign: 'center',
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            color: '#e0e0e0b0',
            callback: function (value) {
              return this.getLabelForValue(Number(value)).charAt(0);
            },
          },
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
      datasets: {
        line: {
          pointRadius: 0,
          pointHitRadius: 15,
          fill: true,
        },
      },
    };

    // Convert callback function object to functions
    handleCallbackFunctions(this.chartData.chartOptions);

    // Merge user options with defaults
    this.lineChartOptions = defaultsDeep(
      this.chartData.chartOptions || {},
      defaultLineChartOptions
    );
  };
}
