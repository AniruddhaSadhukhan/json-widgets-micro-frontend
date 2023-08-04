import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { eachDeep } from 'deepdash-es/standalone';
import {
  cloneDeep,
  get,
  includes,
  isArray,
  isEmpty,
  isPlainObject,
  isString,
  set,
  uniqueId,
  upperCase,
} from 'lodash-es';
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

  @Output() widgetOutput: EventEmitter<any> = new EventEmitter();

  input: any;
  widgetRoot;
  jsonResponse: any = [];
  isRequestObject = false;

  constructor(
    private service: ReportService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {
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
      this.input = cloneDeep(this.jsonInput);
    } else {
      this.input = JSON.parse(this.jsonInput);
    }

    this.variables = cloneDeep(this.variables);

    if (isEmpty(this.input.request)) {
      this.startDrawing();
      return;
    }

    if (!isArray(this.input.request)) {
      this.isRequestObject = true;
      this.input.request = [this.input.request];
    }
    this.jsonResponse = this.input.request.map((_) => []);

    //Loop through all requests
    this.input.request.forEach((req, index) => {
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
    if (index === this.input.request.length - 1) {
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
    const root = this.elRef.nativeElement.querySelector('#' + this.widgetRoot);
    if (root) {
      this.renderer.setProperty(root, 'innerHTML', '');
      this.draw(this.input, root);
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
      const child = this.renderer.createElement('div');
      rowOrColumn === 'rows'
        ? this.renderer.addClass(child, 'row')
        : this.renderer.addClass(child, 'col');

      if (subElement.hasOwnProperty('classes') && subElement.classes.length) {
        subElement.classes.forEach((c) => this.renderer.addClass(child, c));
      }

      this.draw(subElement, child);

      this.renderer.appendChild(parent, child);
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
      try {
        const res = Function(`"use strict";return ${value}`)();
        if (typeof res !== 'function') {
          value = res;
        } else {
          value = res();
        }
      } catch (e) {
        console.debug(e);
        value = '';
      }
    }

    return value;
  };

  drawWidget = (element, parent) => {
    const widget = this.renderer.createElement(`${element.widget}-widget`);

    this.evalResponse(element);

    this.renderer.setProperty(widget, 'chartData', element);
    this.renderer.listen(widget, 'widgetOutput', (e) => {
      this.widgetOutput.emit(e.detail);
    });

    const div = this.renderer.createElement('div');
    if (element.hasOwnProperty('classes') && element.classes.length) {
      element.classes.forEach((c) => this.renderer.addClass(div, c));
    }

    this.renderer.setStyle(div, 'padding', '10px');
    this.renderer.appendChild(div, widget);
    this.renderer.appendChild(parent, div);
  };
}
