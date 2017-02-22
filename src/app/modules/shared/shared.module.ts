import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FullScreenViewComponent} from './components/full-screen-view/full-screen-view.component';
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
