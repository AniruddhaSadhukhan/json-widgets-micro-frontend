import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isArray } from 'lodash-es';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss'],
})
export class ProgressChartComponent implements OnInit {
  @Input() chartData = {
    datasets: [],
    color: '',
    disablePercentage: false,
    clickable: false,
  };
  @Output() widgetOutput: EventEmitter<any> = new EventEmitter();

  loading = true;
  color: string;
  disablePercentage: boolean;

  ngOnInit(): void {
    if (!isArray(this.chartData?.datasets)) {
      this.chartData.datasets = [this.chartData.datasets];
    }

    this.chartData.datasets.forEach((data) => {
      if (data.hasOwnProperty('progress')) {
        data.progress = +data.progress;
      } else {
        let val = +data.value || 0;
        let max = +data.max || 100;
        data.progress = Math.round((val / max) * 10000) / 100;
      }
    });

    this.color = this.chartData.color || '#488aff';
    this.disablePercentage = this.chartData.disablePercentage || false;
    this.loading = false;
  }

  whichWidth(progress) {
    return progress > 0 ? Math.max(progress, 15) + '%' : 0;
  }

  itemClicked = (item) => {
    if (this.chartData.clickable) {
      this.widgetOutput.emit({
        action: 'clicked',
        data: item,
        widget: 'progress-chart',
      });
    }
  };
}
