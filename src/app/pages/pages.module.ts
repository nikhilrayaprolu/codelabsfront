import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {LabnewModule} from "./labnew/labnew.module";
import {LabrunModule} from "./labrun/labrun.module";
import {TrackslistModule} from "./trackslist/trackslist.module";
import {EdittrackModule} from "./edittrack/edittrack.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    LabnewModule,
    LabrunModule,
    TrackslistModule,
    EdittrackModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
