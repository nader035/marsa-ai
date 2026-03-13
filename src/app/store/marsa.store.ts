import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AiService } from '../core/services/ai.service';

type MarsaState = {
  userInput: string;
  generatedContent: string;
  author: string;
  vibe: 'quote' | 'lyric' | 'quran' | 'none';
  isLoading: boolean;
  lang: 'ar' | 'en'; // إضافة اللغة للحالة لسهولة الوصول إليها
};

const initialState: MarsaState = {
  userInput: '',
  generatedContent: '',
  author: 'مَرسى',
  vibe: 'none',
  isLoading: false,
  lang: 'ar',
};

export const MarsaStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const aiService = inject(AiService);

    /**
     * تأثير كتابة النص تدريجياً (Typewriter Effect)
     */
    const animateText = (text: string) => {
      let current = '';
      const words = text.split(' ');
      let i = 0;

      patchState(store, { generatedContent: '' });

      const interval = setInterval(() => {
        if (i < words.length) {
          current += words[i] + ' ';
          patchState(store, { generatedContent: current });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 80);
    };

    return {
      // تحديث النص المدخل من المستخدم
      updateInput(userInput: string) {
        patchState(store, { userInput });
      },

      // تحديث اللغة (يتم استدعاؤها عند تغيير اللغة في الـ Navbar)
      updateLang(lang: 'ar' | 'en') {
        patchState(store, { lang });
      },

      /**
       * استدعاء الذكاء الاصطناعي لتوليد النص
       */
      async generateVibe(type: 'quote' | 'lyric' | 'quran') {
        const currentInput = store.userInput();
        const currentLang = store.lang(); // جلب اللغة الحالية من الـ Store

        if (currentInput.trim().length < 3) return;

        try {
          patchState(store, {
            isLoading: true,
            generatedContent: '',
            author: currentLang === 'ar' ? 'جاري البحث...' : 'Searching...',
            vibe: type,
          });

          // نرسل المدخل، النوع، واللغة للخدمة
          const result = await aiService.generateMarsaEcho(currentInput, type, currentLang);

          patchState(store, {
            author: result.author,
            isLoading: false,
          });

          if (result.content) {
            animateText(result.content);
          }
        } catch (error) {
          patchState(store, {
            isLoading: false,
            generatedContent:
              currentLang === 'ar'
                ? 'انقطع صدى الروح.. حاول مجدداً.'
                : 'The connection failed.. try again.',
            author: currentLang === 'ar' ? 'خطأ' : 'Error',
          });
        }
      },
    };
  }),
);
