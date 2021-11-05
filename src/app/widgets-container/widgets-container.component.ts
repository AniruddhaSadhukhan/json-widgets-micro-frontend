import { Component, Input, OnInit } from '@angular/core';
import {
  isPlainObject,
  cloneDeep,
  isEmpty,
  uniqueId,
  isArray,
  upperCase,
  includes,
  isString,
  get,
  set,
} from 'lodash-es';
import { eachDeep } from 'deepdash-es/standalone';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-widgets-container',
  templateUrl: './widgets-container.component.html',
  styleUrls: ['./widgets-container.component.scss'],
})
export class WidgetsContainerComponent implements OnInit {
  @Input() jsonInput: any;
  @Input() variables: any = {};
  @Input() baseURL = '';
  @Input() tokens: any = {};

  report: any;
  widgetRoot;
  jsonResponse: any = [];
  isRequestObject = false;

  constructor(private service: ReportService) {
    this.widgetRoot = uniqueId('widgetRoot_');
  }

  ngOnInit(): void {
    //   if (this.jsonInput) this.refresh();
  }
  ngOnChanges(): void {
    if (this.jsonInput) this.refresh();
  }
  // ngAfterViewInit(): void {
  //   if (this.jsonInput) this.refresh();
  // }

  refresh() {
    if (isPlainObject(this.jsonInput)) {
      this.report = cloneDeep(this.jsonInput);
    } else {
      this.report = JSON.parse(this.jsonInput);
    }

    this.variables = cloneDeep(this.variables);

    if (isEmpty(this.report.request)) {
      this.startDrawing();
      return;
    }

    if (!isArray(this.report.request)) {
      this.isRequestObject = true;
      this.report.request = [this.report.request];
    }
    this.jsonResponse = this.report.request.map((_) => []);

    //Loop through all requests
    this.report.request.forEach((req, index) => {
      this.handleRequests(req, index);
    });
  }

  handleRequests = (req, index) => {
    let method = upperCase(req.method);
    if (method == 'GRAPHQL') {
      this.handleGraphQLreq(req, index);
    } else if (includes(['GET', 'POST'], method)) {
      this.handleRESTreq(req, index, method);
    }
  };

  handleGraphQLreq = (req, index) => {
    if (isArray(req.body)) {
      req.body = req.body.map((gql) => this.addVariablesToGraphQL(gql));
    } else {
      req.body = this.addVariablesToGraphQL(req.body);
    }

    this.service.makePOSTreq(req, this.baseURL, this.tokens).subscribe(
      (res) => {
        this.storeResponse(res, index);
      },
      ({ error }) => {
        this.storeResponse(error, index);
      }
    );
  };

  storeResponse = (res, index) => {
    if (this.isRequestObject) {
      this.jsonResponse = res;
    } else {
      this.jsonResponse[index] = res;
    }
    if (index === this.report.request.length - 1) {
      console.log(this.jsonResponse);
      this.startDrawing();
    }
  };

  addVariablesToGraphQL = (gql) => {
    if (gql.hasOwnProperty('variables')) {
      gql.variables = { ...this.variables, ...gql.variables };
    } else {
      gql.variables = this.variables;
    }
    return gql;
  };

  handleRESTreq = (req, index, method) => {
    if (method == 'GET') {
      this.service.makeGETreq(req, this.baseURL, this.tokens).subscribe(
        (res) => {
          this.storeResponse(res, index);
        },
        (error) => {
          this.storeResponse(error, index);
        }
      );
    } else if (method == 'POST') {
      this.service.makePOSTreq(req, this.baseURL, this.tokens).subscribe(
        (res) => {
          this.storeResponse(res, index);
        },
        (error) => {
          this.storeResponse(error, index);
        }
      );
    }
  };

  startDrawing = () => {
    const root = document.getElementById(this.widgetRoot);
    if (root) {
      root.innerHTML = '';
      this.draw(this.report, root);
    }
  };

  draw = (element: any, parent: HTMLElement) => {
    if (element.hasOwnProperty('rows')) {
      this.drawRowsOrColumns(element, parent, 'rows');
    } else if (element.hasOwnProperty('columns')) {
      this.drawRowsOrColumns(element, parent, 'columns');
    } else if (element.hasOwnProperty('widgets')) {
      element.widgets.forEach((widget: any) => this.drawWidget(widget, parent));
    }
  };

  drawRowsOrColumns = (element, parent, rowOrColumn) => {
    element[rowOrColumn].forEach((subElement) => {
      const child = document.createElement('div');
      rowOrColumn === 'rows'
        ? child.classList.add('widget-row')
        : child.classList.add('widget-col');

      if (subElement.hasOwnProperty('classes') && subElement.classes.length) {
        child.classList.add(...subElement.classes.map((c) => `widget-${c}`));
      }

      this.draw(subElement, child);

      parent.appendChild(child);
    });
  };

  evalResponse = (widgetData) => {
    eachDeep(
      widgetData,
      (val, _, __, { path }) => {
        if (isString(val)) {
          set(widgetData, `${path}`, this.evalEachValue(val));
        }
      },
      { leavesOnly: true }
    );
  };

  evalEachValue = (value: string) => {
    let isChanged = false;

    value = value.replace(/\${{([A-Za-z0-9_\-\.\[\]]*)}}/g, (_, p) => {
      isChanged = true;
      let gotValue = get(this.jsonResponse, p);

      if (isString(gotValue)) {
        gotValue = `"${gotValue}"`;
      } else if (isArray(gotValue) || isPlainObject(gotValue)) {
        gotValue = JSON.stringify(gotValue);
      }

      return gotValue;
    });

    value = value.replace(/\#{{([A-Za-z0-9_\-\.\[\]]*)}}/g, (_, p) => {
      isChanged = true;
      let gotValue = get(this.variables, p);

      if (isString(gotValue)) {
        gotValue = `"${gotValue}"`;
      } else if (isArray(gotValue) || isPlainObject(gotValue)) {
        gotValue = JSON.stringify(gotValue);
      }

      return gotValue;
    });

    if (isChanged) {
      const res = Function(`"use strict";return ${value}`)();
      if (typeof res !== 'function') {
        value = res;
      } else {
        value = res();
      }
    }

    return value;
  };

  drawWidget = (element, parent) => {
    const widget: any = document.createElement(`${element.widget}-widget`);

    this.evalResponse(element);
    widget.chartData = element;

    const div = document.createElement('div');
    if (element.hasOwnProperty('classes') && element.classes.length) {
      div.classList.add(...element.classes.map((c) => `widget-${c}`));
    }
    console.log(element);
    div.style.padding = '10px';
    div.appendChild(widget);
    parent.appendChild(div);
  };
}
