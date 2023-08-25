import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { defaultsDeep, get, isObject, isString, split } from 'lodash-es';
import { handleCallbackFunctions } from '../utils/chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChartCanvas', { static: true }) canvas: ElementRef;

  chartStyle = {};
  dataAbsent = false;
  @Input() chartData = {
    labels: [],
    datasets: [],
    url: '',
    chartStyle: {},
    dataPresent: false,
    chartOptions: {},
    title: '',
    subtitle: '',
    info: '',
    hideLegend: true,
    dataAbsentText: '',
  };

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

      // Check if data is present, else stop processing further
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
          backgroundColor: '#8626C366-#8626C305',
          borderColor: '#8626C3',
          pointBackgroundColor: '#8626C3',
        },
        {
          data: [],
          backgroundColor: '#FB883266-#FB883205',
          borderColor: '#FB8832',
          pointBackgroundColor: '#FB8832',
        },
      ];

    // Merge the default datasets with user input and delete excess datasets
    this.lineChartDatasets = defaultsDeep(
      this.chartData.datasets || [],
      defaultLineChartDatasets
    ).filter((dataset) => dataset.data.length > 0);

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
          align: 'end',
          anchor: 'end',
          clamp: true,
          formatter: (value, ctx) => {
            let label = value;
            if (isObject(value)) {
              label = get(
                value,
                ctx.dataset?.parsing?.['yAxisKey'],
                get(value, 'label', JSON.stringify(value))
              );
            }
            return `${label}`;
          },
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
          offset: true,
        },
        y: {
          grid: {
            drawOnChartArea: false,
          },
          beginAtZero: true,
          grace: '10%',
        },
      },
      datasets: {
        line: {
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
