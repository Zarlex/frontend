import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ScrollNavigatorDirective} from './directives/scroll-navigator.directive';
import {FullScreenViewDirective} from './directives/full-screen-view.directive';
import {SlideManagerComponent} from './components/slide-manager/slide-manager.component';
import {SlideComponent} from './components/slide/slide.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    FullScreenViewDirective,
    ScrollNavigatorDirective,
    SlideManagerComponent,
    SlideComponent
  ],
  declarations: [
    FullScreenViewDirective,
    ScrollNavigatorDirective,
    SlideManagerComponent,
    SlideComponent
  ]
})

export class SharedModule {
}
