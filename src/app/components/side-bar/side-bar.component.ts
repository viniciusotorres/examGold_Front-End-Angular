import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme-service/theme.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

// --> VARIAVEIS DE HOVER
  isHoveredHome = false;
  isHoveredEscolas = false;
  isHoveredLogout = false;
  isHoveredDarkTheme = false;

// --> VARIAVEL DE TIMEOUT DO HOVER
  hoverTimeout: any;

// --> VARIAVEIS DE POSIÇÃO DO HOVER
  hoverHomePosition = { top: 0 };
  hoverEscolasPosition = { top: 0 };
  hoverLogoutPosition = { top: 0 };
  hoverDarkThemePosition = { top: 0 };

// --> VARIAVEIS DE REFERENCIA DO ELEMENTO
  @ViewChild('homeIcon', { static: false }) homeIcon!: ElementRef;
  @ViewChild('escolasIcon', { static: false }) escolasIcon!: ElementRef;
  @ViewChild('logoutIcon', { static: false }) logoutIcon!: ElementRef;
  @ViewChild('darkThemeIcon', { static: false }) darkModeIcon!: ElementRef;

  constructor(private router: Router, private themeService: ThemeService) {}



  /* -------------------------------------------------------------------------- */
  /*            FUNÇÃO DE ABRIR HOVER QUANDO O USUARIO PASSAR O MOUSE           */
  /* -------------------------------------------------------------------------- */

  onHover(icon: string) {
    clearTimeout(this.hoverTimeout);
    this.resetHoverStates();

    switch (icon) {
      case 'home':
        this.isHoveredHome = true;
        this.setHoverPosition(this.homeIcon, 'home');
        break;
      case 'escolas':
        this.isHoveredEscolas = true;
        this.setHoverPosition(this.escolasIcon, 'escolas');
        break;
      case 'logout':
        this.isHoveredLogout = true;
        this.setHoverPosition(this.logoutIcon, 'logout');
        break;
      case 'darktheme':
        this.isHoveredDarkTheme = true;
        this.setHoverPosition(this.darkModeIcon, 'darktheme');
        break;
    }
  }

  resetHoverStates() {
    this.isHoveredHome = false;
    this.isHoveredEscolas = false;
    this.isHoveredLogout = false;
    this.isHoveredDarkTheme = false;
  }

  setHoverPosition(elementRef: ElementRef, icon: string) {
    const rect = elementRef.nativeElement.getBoundingClientRect();
    switch (icon) {
      case 'home':
        this.hoverHomePosition = { top: rect.top };
        break;
      case 'escolas':
        this.hoverEscolasPosition = { top: rect.top };
        break;
      case 'logout':
        this.hoverLogoutPosition = { top: rect.top };
        break;
      case 'darktheme':
        this.hoverDarkThemePosition = { top: rect.top };
        break;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*   METODO DE FECHAR O HOVER QUANDO O USUARIO TIRAR O MOUSE COM TIMEOUT      */
  /* -------------------------------------------------------------------------- */

  onLeaveIcon(icon: string) {
    this.hoverTimeout = setTimeout(() => {
      switch (icon) {
        case 'home':
          this.isHoveredHome = false;
          break;
        case 'escolas':
          this.isHoveredEscolas = false;
          break;
        case 'logout':
          this.isHoveredLogout = false;
          break;
        case 'darktheme':
          this.isHoveredDarkTheme = false;
          break;
      }
      this.themeService.applyTheme();
    }, 300);
  }
  /* -------------------------------------------------------------------------- */
  /*            METODO QUE CANCELA O FECHAMENTO DO HOVER POR TIMEOUT            */
  /* -------------------------------------------------------------------------- */
  onEnterHover() {
    clearTimeout(this.hoverTimeout);
  }

  /* -------------------------------------------------------------------------- */
  /*           METODO DE FECHAR O HOVER QUANDO O USUARIO TIRAR O MOUSE          */
  /* -------------------------------------------------------------------------- */
  onLeave(icon: string) {
    switch (icon) {
      case 'home':
        this.isHoveredHome = false;
        break;
      case 'escolas':
        this.isHoveredEscolas = false;
        break;
      case 'logout':
        this.isHoveredLogout = false;
        break;
      case 'darktheme':
        this.isHoveredDarkTheme = false;
        break;
    }
    this.themeService.applyTheme();
  }

  /* -------------------------------------------------------------------------- */
  /*                    METODO DE NAVEGAÇÃO ENTRE AS ROTAS                      */
  /* -------------------------------------------------------------------------- */
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /* -------------------------------------------------------------------------- */
  /*                          METODO DE LOGOUT DO USUARIO                       */
  /* -------------------------------------------------------------------------- */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  /* -------------------------------------------------------------------------- */
  /*                          METODO DE MUDAR O TEMA                            */
  /* -------------------------------------------------------------------------- */

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  /* -------------------------------------------------------------------------- */
  /*                        FUNÇÃO DE PEGAR O ICON DO TEMA                      */
  /* -------------------------------------------------------------------------- */
  getThemeIcon() {
    return this.themeService.isDarkMode ? 'bi-sun' : 'bi-moon';
  }

}
