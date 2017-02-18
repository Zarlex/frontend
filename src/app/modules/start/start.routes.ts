import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StartViewComponent}   from './components/start-view/start-view.component';

const routes: Routes = [
    {path: 'start', component: StartViewComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class StartRoutingModule {
}
