import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NavigationStart, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" *ngIf="showMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  showMenu = true;
  constructor(router: Router, location: Location) {
    router.events.subscribe(val => {
      console.log(location.path().includes('labrun'));
      if (location.path().includes('labrun')) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    })
  }


}
