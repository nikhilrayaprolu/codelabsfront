import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {LabnewComponent} from "./labnew/labnew.component";
import {LabrunComponent} from "./labrun/labrun.component";
import {TrackslistComponent} from "./trackslist/trackslist.component";
import {EdittrackComponent} from "./edittrack/edittrack.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseviewComponent} from "./courseview/courseview.component";
import {CoursetrackComponent} from "./coursetrack/coursetrack.component";
import {EvalsubmissionComponent} from "./evalsubmission/evalsubmission.component";

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
      path: 'labrun/:trackid/:courseid/:studentid/:instructor',
      component: LabrunComponent,
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
      path: 'courses',
      component: CoursesComponent,
    },
    {
      path: 'courseview/:courseid',
      component: CourseviewComponent,
    },
    {
      path: 'coursetrack/:courseid/:trackid',
      component: CoursetrackComponent,
    },
    {
      path: 'evalsubmission/:trackid/:courseid/:studentid/:serial_number',
      component: EvalsubmissionComponent,
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
