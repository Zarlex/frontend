import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FullScreenViewDirective} from './directives/full-screen-view.directive';

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    FullScreenViewDirective
  ],
  declarations: [
    FullScreenViewDirective
  ]
})

export class SharedModule {
}
