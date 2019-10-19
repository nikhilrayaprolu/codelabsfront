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
import {EdittrackComponent} from "./edittrack.component";
import {RouterModule} from "@angular/router";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MonacoEditorModule} from "ngx-monaco-editor";


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
    CKEditorModule,
    MonacoEditorModule,
  ],
  declarations: [
    EdittrackComponent,
  ],
})
export class EdittrackModule { }
