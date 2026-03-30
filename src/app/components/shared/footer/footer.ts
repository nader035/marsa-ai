import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithub, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FaIconComponent, TranslocoPipe], 
  templateUrl: './footer.html',
})
export class FooterComponent {
  lang = input.required<'ar' | 'en'>();

  readonly githubIcon = faGithub;
  readonly xIcon = faXTwitter;
  readonly linkedinIcon = faLinkedinIn;
}