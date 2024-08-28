import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {NavigationEnd, Router} from "@angular/router";
import {ThemeService} from "../../services/theme-service/theme.service";
import {UsersService} from "../../services/users-service/users.service";
import {filter} from "rxjs";
import {AuthService} from "../../services/auth-service/auth.service";

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
  isHoveredPerfil = false;
  isHoveredDefinicoes = false;
  isHoveredMinhaEscola = false;

// --> VARIAVEL DE TIMEOUT DO HOVER
  hoverTimeout: any;

// --> VARIAVEIS DE POSIÇÃO DO HOVER
  hoverHomePosition = { top: 0 };
  hoverEscolasPosition = { top: 0 };
  hoverLogoutPosition = { top: 0 };
  hoverDarkThemePosition = { top: 0 };
  hoverPerfilPosition = { top: 0 };
  hoverDefinicoesPosition = { top: 0 };
  hoverMinhaEscolaPosition = { top: 0 };

// --> VARIAVEIS DE REFERENCIA DO ELEMENTO
  @ViewChild('homeIcon', { static: false }) homeIcon!: ElementRef;
  @ViewChild('escolasIcon', { static: false }) escolasIcon!: ElementRef;
  @ViewChild('logoutIcon', { static: false }) logoutIcon!: ElementRef;
  @ViewChild('darkThemeIcon', { static: false }) darkModeIcon!: ElementRef;
  @ViewChild('perfilIcon', { static: false }) perfilIcon!: ElementRef;
  @ViewChild('definicoesIcon', { static: false }) definicoesIcon!: ElementRef;
  @ViewChild('minhaEscolaIcon', { static: false }) minhaEscolaIcon!: ElementRef;

  itsTeacher: string = 'teacher';

  userId!: number;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private userService: UsersService,
    private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();

// Subscribe to router events to reinitialize the component on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadUserData();
    });

    // Subscribe to login events to reinitialize the component after login
    this.authService.onLogin().subscribe(() => {
      this.loadUserData();
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                    METODO DE CARREGAR OS DADOS DO USUARIO                   */
  /* -------------------------------------------------------------------------- */
  loadUserData() {
    this.userId = +localStorage.getItem('userId')!;
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data: any) => {
        this.itsTeacher = data.itsTeacher ? 'teacher' : 'student';
      });
    }
  }

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
      case 'perfil':
        this.isHoveredPerfil = true;
        this.setHoverPosition(this.perfilIcon, 'perfil');
        break;
      case 'definicoes':
        this.isHoveredDefinicoes = true;
        this.setHoverPosition(this.definicoesIcon, 'definicoes');
        break;
      case 'minha-escola':
        this.isHoveredMinhaEscola = true;
        this.setHoverPosition(this.minhaEscolaIcon, 'minha-escola');
        break;
    }
  }

  resetHoverStates() {
    this.isHoveredHome = false;
    this.isHoveredEscolas = false;
    this.isHoveredLogout = false;
    this.isHoveredDarkTheme = false;
    this.isHoveredPerfil = false;
    this.isHoveredDefinicoes = false;
    this.isHoveredMinhaEscola = false

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
      case 'perfil':
        this.hoverPerfilPosition = { top: rect.top };
        break;
      case 'definicoes':
        this.hoverDefinicoesPosition = { top: rect.top };
        break;
      case 'minha-escola':
        this.hoverMinhaEscolaPosition = { top: rect.top };
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
        case 'perfil':
          this.isHoveredPerfil = false;
          break;
        case 'definicoes':
          this.isHoveredDefinicoes = false;
          break
        case 'minha-escola':
          this.isHoveredMinhaEscola = false;
          break
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
      case 'perfil':
        this.isHoveredPerfil = false;
        break;
      case 'definicoes':
        this.isHoveredDefinicoes = false;
        break;
      case 'minha-escola':
        this.isHoveredMinhaEscola = false;
        break
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
    localStorage.removeItem('theme');
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
