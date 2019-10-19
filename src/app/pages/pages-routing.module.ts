import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {LabnewComponent} from "./labnew/labnew.component";
import {LabrunComponent} from "./labrun/labrun.component";
import {TrackslistComponent} from "./trackslist/trackslist.component";
import {EdittrackComponent} from "./edittrack/edittrack.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'newlab',
      component: LabnewComponent,
    },
    {
      path: 'labrun/:trackid/:courseid/:studentid',
      component: LabrunComponent,
    },
    {
      path: 'labrun/:trackid/:courseid',
      component: LabrunComponent,
    },
    {
      path: 'labrun/:trackid',
      component: LabrunComponent,
    },
    {
      path: 'mytracks',
      component: TrackslistComponent,
    },
    {
      path: 'edittrack/:trackid',
      component: EdittrackComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
