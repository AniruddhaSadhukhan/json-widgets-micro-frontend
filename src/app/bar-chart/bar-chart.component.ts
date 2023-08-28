import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { defaultsDeep, get, isObject } from 'lodash-es';
import { handleCallbackFunctions } from '../utils/chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
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

  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'];
  public barChartLabels: ChartConfiguration<'bar'>['data']['labels'] = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {};
  barChartPlugins: ChartConfiguration<'bar'>['plugins'] = [ChartDataLabels];

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
    // Set datasets
    this.barChartDatasets = this.chartData.datasets;

    // Set labels if needed
    this.barChartLabels = this.chartData.labels;
  };

  setUpOptions = () => {
    // Default configuration for bar chart
    let defaultBarChartOptions: ChartConfiguration<'bar'>['options'] = {
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
        bar: {
          maxBarThickness: 40,
          borderRadius: {
            bottomLeft: 8,
            bottomRight: 8,
            topLeft: 8,
            topRight: 8,
          },
        },
      },
    };

    // Convert callback function object to functions
    handleCallbackFunctions(this.chartData.chartOptions);

    // Merge user options with defaults
    this.barChartOptions = defaultsDeep(
      this.chartData.chartOptions || {},
      defaultBarChartOptions
    );
  };
}
