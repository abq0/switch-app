import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  constructor() {}

  // Check if dark theme is enabled
  isDarkTheme(): boolean {
    const theme = localStorage.getItem(this.THEME_KEY);
    return theme === this.DARK_THEME;
  }

  // Toggle between dark and light themes
  toggleTheme(): void {
    const isDark = this.isDarkTheme();
    this.setTheme(isDark ? this.LIGHT_THEME : this.DARK_THEME);
  }

  // Set the theme (dark or light)
  setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  // Apply the theme to the document
  private applyTheme(theme: string): void {
    const body = document.body;
    if (theme === this.DARK_THEME) {
      body.classList.add(this.DARK_THEME);
    } else {
      body.classList.remove(this.DARK_THEME);
    }
  }

  // Initialize the theme based on localStorage or system preference
  initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      // Use system preference if no theme is saved
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.setTheme(prefersDark ? this.DARK_THEME : this.LIGHT_THEME);
    }
  }
}