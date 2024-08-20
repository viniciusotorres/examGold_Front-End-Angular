import {Component, HostListener, ViewChild, AfterViewInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {UsersService} from "./services/users.service";
import {SharedsService} from "./services/shareds.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  userId: number = 0;
  @ViewChild('drawer') drawer!: MatDrawer;

  name: string = '';
  isLoggedIn = false;
  title = 'Front';
  isDarkMode = false;

  constructor(private router: Router,
              private sharedServices: SharedsService,
              private userService: UsersService) {
    this.router.events.subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('token');
      if (this.isLoggedIn) {
        this.drawer.open();
      } else {
        this.drawer.close();
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
    this.drawer.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        this.userId = this.sharedServices.getUserId();
        this.getByid(this.userId);
      }
    });
  }

  getByid(userId: number){
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        console.log(data);
        this.name = data.username;
        localStorage.setItem('userId', userId.toString());
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      document.querySelector('.side-nav')?.classList.add('dark-mode');
      document.querySelector('.side-nav')?.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      document.querySelector('.side-nav')?.classList.add('light-mode');
      document.querySelector('.side-nav')?.classList.remove('dark-mode');
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
