import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule, NbStepperModule,
} from '@nebular/theme';
import {NgxLoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule, MatInputModule, MatStepperModule} from "@angular/material";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbStepperModule,
    NbAuthModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    // ... here goes our new components
  NgxLoginComponent,
    RegisterComponent,
    ],
})
export class NgxAuthModule {
}
