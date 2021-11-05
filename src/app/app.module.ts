import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetsContainerComponent } from './widgets-container/widgets-container.component';
import { SmallStatComponent } from './small-stat/small-stat.component';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createCustomElement } from '@angular/elements';
import { each } from 'lodash-es';

@NgModule({
  declarations: [AppComponent, WidgetsContainerComponent, SmallStatComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {
    this.createMF();
  }

  microFrontendsMap = {
    'small-stat-widget': SmallStatComponent,
    'json-widgets': WidgetsContainerComponent,
  };
  createMF = () => {
    each(this.microFrontendsMap, (component, mfName) => {
      const mf = createCustomElement(component, {
        injector: this.injector,
      });
      customElements.define(mfName, mf);
    });
  };
  // ngDoBootstrap() {}
}
