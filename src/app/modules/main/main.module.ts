import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {MainComponent}     from './components/main/main.component';
import {MainRoutingModule}     from './main.routes';
import {StartModule} from '../start/start.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    MainRoutingModule,
    StartModule
  ],
  declarations: [
    MainComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [ MainComponent ]
})
export class MainModule { }
