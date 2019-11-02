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
  NbIconModule, NbInputModule, NbLayoutModule, NbProgressBarModule, NbStepperModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import {NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MonacoEditorModule} from "ngx-monaco-editor";
import {LabrunComponent} from "./labrun.component";
import {BsDropdownModule} from "ngx-bootstrap";
import {RouterModule} from '@angular/router';
import {NgxFileDropModule} from "ngx-file-drop";

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
    CKEditorModule,
    MonacoEditorModule,
    NbLayoutModule,
    BsDropdownModule,
    RouterModule,
    NbProgressBarModule,
    NgxFileDropModule,
    NbStepperModule
  ],
  declarations: [
    LabrunComponent,
  ],
})
export class LabrunModule { }
