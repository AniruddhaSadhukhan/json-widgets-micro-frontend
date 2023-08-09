import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
