import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { forOwn } from 'lodash-es';
import { NgChartsModule } from 'ng2-charts';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AppComponent } from './app.component';
import { SmallStatComponent } from './small-stat/small-stat.component';
import { StatGraphCardComponent } from './stat-graph-card/stat-graph-card.component';
import { WidgetsContainerComponent } from './widgets-container/widgets-container.component';

const WidgetComponentMap = {
  // 'small-stat-widget': SmallStatComponent,
  'stat-graph-card': StatGraphCardComponent,
};

const MaterialModules = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    WidgetsContainerComponent,
    SmallStatComponent,
    StatGraphCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxTippyModule,
    ...MaterialModules,
  ],
  providers: [],
  // bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {
    forOwn(WidgetComponentMap, (component, widgetName) => {
      customElements.define(
        `${widgetName}-widget`,
        createCustomElement(component, {
          injector: this.injector,
        })
      );
    });

    customElements.define(
      'json-widgets',
      createCustomElement(WidgetsContainerComponent, {
        injector: this.injector,
      })
    );
  }

  ngDoBootstrap() {}
}
