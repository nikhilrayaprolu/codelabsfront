import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule, NbInputModule, NbLayoutModule, NbToggleModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import {NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {UserprofileComponent} from "./userprofile.component";


@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NgxEchartsModule,
    AmazingTimePickerModule,
    NgbTimepickerModule,
    NbLayoutModule,
    RouterModule,
    NbToggleModule,
  ],
  declarations: [
    UserprofileComponent,
  ],
})
export class UserprofileModule { }
