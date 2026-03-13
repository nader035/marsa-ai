import { Component, inject, computed, input } from '@angular/core';
// 1. استبدال Lucide بـ FontAwesome
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faShareNodes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { MarsaStore } from '../../store/marsa.store';
import { ShareService } from '../../core/services/share.service';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  // 2. تحديث الـ imports
  imports: [FaIconComponent],
  templateUrl: './card-preview.html',
})
export class CardPreview {
  readonly store = inject(MarsaStore);
  private shareService = inject(ShareService);

  lang = input.required<'ar' | 'en'>();
  isDarkMode = input.required<boolean>();

  // 3. تعريف أيقونات FontAwesome
  readonly shareIcon = faShareNodes;
  readonly downloadIcon = faDownload;

  dynamicFontSize = computed(() => {
    const content = this.store.generatedContent() || '';
    const isAr = this.lang() === 'ar';
    if (content.length > 100) return isAr ? 'text-xl' : 'text-lg';
    if (content.length > 50) return isAr ? 'text-2xl' : 'text-xl';
    return isAr ? 'text-4xl' : 'text-3xl';
  });

  async onShare() {
    await this.shareService.shareCard('Marsa-card');
  }

  async onDownload() {
    if (!this.store.generatedContent()) return;
    await this.shareService.shareCard('Marsa-card');
  }
}
