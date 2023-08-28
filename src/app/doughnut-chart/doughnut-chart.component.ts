import { AfterViewInit, Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { defaultsDeep, get, isObject } from 'lodash-es';
import { handleCallbackFunctions } from '../utils/chart';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements AfterViewInit {
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

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
  public doughnutChartLabels: ChartConfiguration<'doughnut'>['data']['labels'] =
    [];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {};
  doughnutChartPlugins: ChartConfiguration['plugins'] = [ChartDataLabels];

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
    this.doughnutChartDatasets = this.chartData.datasets;

    // Set labels if needed
    this.doughnutChartLabels = this.chartData.labels;
  };

  setUpOptions = () => {
    // Default configuration for doughnut chart
    let defaultDoughnutChartOptions: ChartConfiguration<'doughnut'>['options'] =
      {
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
        },
        cutout: '50%',
        plugins: {
          datalabels: {
            display: false,
            clamp: true,
            formatter: (value, ctx) => {
              let label = value;
              if (isObject(value)) {
                label = get(value, 'label', JSON.stringify(value));
              }
              return `${label}`;
            },
          }
        }
      };

    // Convert callback function object to functions
    handleCallbackFunctions(this.chartData.chartOptions);

    // Merge user options with defaults
    this.doughnutChartOptions = defaultsDeep(
      this.chartData.chartOptions || {},
      defaultDoughnutChartOptions
    );
  };
}
