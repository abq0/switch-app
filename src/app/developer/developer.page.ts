import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
  standalone: false,
})
export class DeveloperPage implements OnInit {

  isDarkTheme: boolean; // true = dark theme, false = light theme


  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/settings']);
  }

}
