import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = false;

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    this.applyTheme();
  }

  /* -------------------------------------------------------------------------- */
  /*                          TOGGLE DARK MODE                                  */
  /* -------------------------------------------------------------------------- */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  /* -------------------------------------------------------------------------- */
  /*                          APPLY THEME                                       */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                          SET THEME                                         */
  /* -------------------------------------------------------------------------- */
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
