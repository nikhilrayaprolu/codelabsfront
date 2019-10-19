/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {server} from "./config";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {AuthGuard} from "./auth-guard.service";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    MonacoEditorModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,

            key: 'access', // this parameter tells where to look for the token
          },
          baseEndpoint: server,
          login: {
            // ...
            endpoint: '/auth/login',
            redirect: {
              success: 'pages/dashboard',
              failure: null,
            },
          },
          register: {
            // ...
            endpoint: '/auth/register',
            redirect: {
              success: 'auth/login',
              failure: null,
            },
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
          },
        }),
      ],
      forms: {},
    }),
    BsDropdownModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
  ],
})
export class AppModule {
}
