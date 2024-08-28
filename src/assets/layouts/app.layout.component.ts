import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SideBarComponent} from "../../app/components/side-bar/side-bar.component";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SideBarComponent,
    MatDrawerContainer,
    MatDrawer
  ],
  template: `
    <mat-drawer-container class="container-principal">
      <!-- SIDE BAR -->
      <mat-drawer #drawer mode="side" class="side-nav">
        <app-side-bar ></app-side-bar>
      </mat-drawer>
      <!-- CONTENT -->
      <div>
        <router-outlet></router-outlet>
      </div>
    </mat-drawer-container>
  `,
  styleUrls: ['../../app/app.component.scss'],
})
export class AppLayoutComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit() {
    // Additional logic to control the drawer, if necessary
  }
}
