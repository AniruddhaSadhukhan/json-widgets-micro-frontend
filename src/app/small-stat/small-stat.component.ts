import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-stat',
  templateUrl: './small-stat.component.html',
  styleUrls: ['./small-stat.component.scss'],
})
export class SmallStatComponent implements OnInit {
  @Input() chartData = {
    value: '',
    showSeparateUnit: false,
    unitLessValue: '',
    unit: '',
    displayAsIndividualCard: false,
    title: '',
    subtitle: '',
    trend: '',
    info: '',
    icon: '',
  };

  showFullValue = true;

  constructor() {}

  ngOnInit(): void {
    // Decide stat unit
    if (this.chartData.value && this.chartData.showSeparateUnit) {
      const fullValue = this.chartData.value;
      try {
        this.chartData.unitLessValue = fullValue.match(/[.0-9]+/)[0];
        this.chartData.unit = fullValue
          .replace(this.chartData.unitLessValue, '')
          .trim();
        this.showFullValue = false;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
