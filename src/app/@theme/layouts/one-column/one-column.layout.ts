import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed *ngIf="showMenu">
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" state="compacted" responsive *ngIf="showMenu">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column [ngClass]="{'on_not_menu': showMenu == false}">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed *ngIf="showMenu">
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
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
