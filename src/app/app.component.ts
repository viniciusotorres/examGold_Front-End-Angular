import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { UsersService } from "./services/users-service/users.service";
import { SharedsService } from "./services/shareds-service/shareds.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth-service/auth.service";
import { AppLayoutComponent } from "../assets/layouts/app.layout.component";

@Component({
  selector: 'app-root',
  template: '<app-main-layout></app-main-layout>',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, CommonModule, AppLayoutComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // --> USER PROPERTIES
  userId: number = 0;
  name: string = '';

// --> AUTHENTICATION PROPERTIES
  isLoggedIn = false;

// --> APPLICATION PROPERTIES
  title = 'Front';
  isDarkMode = false;

  @ViewChild(AppLayoutComponent) appLayoutComponent!: AppLayoutComponent;

  constructor(
    private router: Router,
    private sharedServices: SharedsService,
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.router.events.subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('token');
      if (this.isLoggedIn && this.appLayoutComponent.drawer) {
        this.appLayoutComponent.drawer.open();
      } else if (this.appLayoutComponent.drawer) {
        this.appLayoutComponent.drawer.close();
      }
    });
  }

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.getByid(this.userId);
    }
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    this.applyTheme();
  }

  ngAfterViewInit() {
    if (this.appLayoutComponent.drawer) {
      this.appLayoutComponent.drawer.openedChange.subscribe((opened: boolean) => {
        if (opened) {
          this.userId = this.sharedServices.getUserId();
          this.getByid(this.userId);
        }
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                          USER METHODS                                      */
  /* -------------------------------------------------------------------------- */
  getByid(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        console.log(data);
        this.name = data.username;
        localStorage.setItem('userId', userId.toString());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                          THEME METHODS                                     */
  /* -------------------------------------------------------------------------- */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const bodyClassList = document.body.classList;
    const sideNavClassList = document.querySelector('.side-nav')?.classList;
    const hoverHomeElements = document.querySelectorAll('.hover-home');

    if (this.isDarkMode) {
      this.setTheme(bodyClassList, sideNavClassList, hoverHomeElements, 'dark-mode', 'light-mode');
    } else {
      this.setTheme(bodyClassList, sideNavClassList, hoverHomeElements, 'light-mode', 'dark-mode');
    }
  }

  private setTheme(bodyClassList: DOMTokenList, sideNavClassList: DOMTokenList | undefined, hoverHomeElements: NodeListOf<Element>, addClass: string, removeClass: string) {
    bodyClassList.add(addClass);
    bodyClassList.remove(removeClass);
    sideNavClassList?.add(addClass);
    sideNavClassList?.remove(removeClass);
    hoverHomeElements.forEach(el => {
      el.classList.add(addClass);
      el.classList.remove(removeClass);
    });
  }
}
