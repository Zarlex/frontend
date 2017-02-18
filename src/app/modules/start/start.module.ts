import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {StartRoutingModule}     from './start.routes';
import {StartViewComponent}     from './components/start-view/start-view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StartRoutingModule
  ],
  declarations: [
    StartViewComponent
  ]
})

export class StartModule {
}
