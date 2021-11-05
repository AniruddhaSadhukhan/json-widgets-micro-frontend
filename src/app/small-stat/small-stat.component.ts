import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-stat',
  templateUrl: './small-stat.component.html',
  styleUrls: ['./small-stat.component.scss'],
})
export class SmallStatComponent implements OnInit {
  @Input() chartData;
  constructor() {}

  ngOnInit(): void {}
}
