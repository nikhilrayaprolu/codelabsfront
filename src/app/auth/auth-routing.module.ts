import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAuthComponent} from '@nebular/auth';
import {NgxLoginComponent} from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {RegisterService} from "../services/register.service";

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, // <---
      },
      {
        path: 'register',
        component: RegisterComponent, // <---
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RegisterService],
})
export class NgxAuthRoutingModule {
}
