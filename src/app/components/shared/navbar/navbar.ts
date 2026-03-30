import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// استيراد الأيقونات المطلوبة
import { faMoon, faSun, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FaIconComponent, TranslocoPipe], 
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  isDark = input.required<boolean>();
  lang = input.required<'ar' | 'en'>();

  toggleTheme = output<void>();
  toggleLang = output<void>();

  // تعريف أيقونات FontAwesome
  readonly moonIcon = faMoon;
  readonly sunIcon = faSun;
  readonly langIcon = faGlobe; // أيقونة الكرة الأرضية بتبان أشيك للغات
  readonly githubIcon = faGithub;
}
