import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  isDarkTheme: boolean; // true = dark theme, false = light theme

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  navigateToDeveloper() {
    this.router.navigate(['/developer']);
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

}


