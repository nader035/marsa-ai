import { Component, inject, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoPipe } from '@jsverse/transloco';
// ⚠️ تم تغيير faSparkles إلى faWandMagicSparkles المجانية
import {
  faWandMagicSparkles,
  faMusic,
  faQuoteLeft,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { MarsaStore } from '../../store/marsa.store';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [FormsModule, FaIconComponent, TranslocoPipe],
  templateUrl: './chat-area.html',
  styleUrl: './chat-area.css',
})
export class ChatArea {
  readonly store = inject(MarsaStore);
  lang = input.required<'ar' | 'en'>();

  // تحديث اسم الأيقونة هنا
  readonly sparklesIcon = faWandMagicSparkles;
  readonly musicIcon = faMusic;
  readonly quoteIcon = faQuoteLeft;
  readonly bookIcon = faBook;

  isArabic = computed(() => this.lang() === 'ar');

  generate(type: 'quote' | 'lyric' | 'quran') {
    if (this.store.userInput().trim().length >= 3 && !this.store.isLoading()) {
      this.store.generateVibe(type);
    }
  }
}
