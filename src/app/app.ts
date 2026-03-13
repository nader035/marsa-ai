import { Component, signal, effect, inject } from '@angular/core';
import { CardPreview } from './components/card-preview/card-preview';
import { NavbarComponent } from './components/shared/navbar/navbar';
import { ChatArea } from './components/chat-area/chat-area';
import { FooterComponent } from './components/shared/footer/footer';
import { MarsaStore } from './store/marsa.store'; // تأكد من صحة المسار للفولدر عندك

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatArea, CardPreview, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // 1. حقن الـ Store للتحكم في الحالة العامة للتطبيق
  readonly store = inject(MarsaStore);

  title = signal('Marsa');
  isDarkMode = signal(true);
  currentLang = signal<'ar' | 'en'>('ar');

  constructor() {
    /**
     * Effect: لمراقبة التغييرات وتطبيقها على الـ DOM والـ Store
     */
    effect(() => {
      // تطبيق الثيم (Dark/Light)
      document.body.classList.toggle('light-theme', !this.isDarkMode());

      // تطبيق إعدادات اللغة (Direction & Lang Attribute)
      const lang = this.currentLang();
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;

      // ⚠️ تحديث اللغة داخل الـ Store لضمان دقة ردود الـ AI ورسائل الخطأ
      this.store.updateLang(lang);
    });
  }

  /**
   * تبديل وضع الإضاءة
   */
  onThemeToggle() {
    this.isDarkMode.update((v) => !v);
  }

  /**
   * تبديل لغة التطبيق
   */
  onLanguageToggle() {
    this.currentLang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }
}
