import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {StartRoutingModule}     from './start.routes';
import {StartViewComponent}     from './components/start-view/start-view.component';
import {SharedModule} from '../shared/shared.module';
import {IntroViewComponent} from './components/intro-view/intro-view.component';
import {OverviewModule} from '../overview/overview.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    OverviewModule,
    StartRoutingModule
  ],
  declarations: [
    StartViewComponent,
    IntroViewComponent
  ]
})

export class StartModule {
}
