import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {OverviewRoutingModule} from './overview.routes';
import {OverviewComponent} from './components/overview/overview.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    OverviewRoutingModule
  ],
  exports: [
    OverviewComponent
  ],
  declarations: [
    OverviewComponent
  ]
})

export class OverviewModule {
}
