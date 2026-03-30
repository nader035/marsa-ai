import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type MarsaVibe = 'quote' | 'lyric' | 'quran';
export type MarsaLang = 'ar' | 'en';

export interface MarsaEchoResponse {
  content: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.hfToken;

  private readonly apiUrl = '/marsa-api/v1/chat/completions';

  async generateMarsaEcho(
    prompt: string,
    type: MarsaVibe,
    lang: MarsaLang,
  ): Promise<MarsaEchoResponse> {
    
    // تم إضافة أمر صارم بمنع الـ Reasoning والـ Thinking
    const systemPrompt = `
      [STRICT IDENTITY]: You are "MARSA ENGINE".
      [CORE MISSION]: Return ONLY EXISTING, AUTHENTIC text.
      [THINKING RULE]: DO NOT show your internal thoughts. DO NOT use <think> tags. DO NOT explain your process.
      
      [STRICT CATEGORY RULES]:
      1. [quran]: 100% accurate Ayah only. 
      2. [lyric]: Real song lyrics from (Abbadi Al-Johar, Talal Maddah, Fairuz).
      3. [quote]: Verified literary/historical quotes.

      [NEGATIVE CONSTRAINTS]:
      - NO CHATTER: Start immediately with the result.
      - NO INTROS: Do not say "First, I will..." or "Here is...".
      - NO ECHOING: Do not repeat the keyword.

      [OUTPUT FORMAT]: TEXT | SOURCE
    `;

    const body = {
      model: 'deepseek-ai/DeepSeek-V3', // تأكد من الاسم الصحيح للموديل
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `SEARCH_REQUEST: [Category: ${type}] [Keyword: ${prompt}]. Output ONLY the result in format: TEXT | SOURCE.` 
        },
      ],
      temperature: type === 'quran' ? 0.0 : 0.6,
      max_tokens: 250,
      presence_penalty: 0.6
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    try {
      const response: any = await firstValueFrom(this.http.post(this.apiUrl, body, { headers }));
      
      let rawResponse = response.choices[0].message.content.trim();
      
      // الخطوة السحرية: تنظيف أي "تفكير" أو مقدمات من الموديل
      rawResponse = this.cleanDeeply(rawResponse);

      if (rawResponse.includes('|')) {
        const [content, ...authorParts] = rawResponse.split('|');
        return {
          content: content.trim(),
          author: authorParts.join('|').trim() || (lang === 'ar' ? 'مَرسى' : 'Marsa'),
        };
      }

      return { content: rawResponse, author: lang === 'ar' ? 'مَرسى' : 'Marsa' };

    } catch (error: any) {
      console.error('Marsa API Error:', error);
      return {
        content: lang === 'ar' ? 'تاه البحار في طلبك.. حاول مجدداً.' : 'The sailor lost his way.. try again.',
        author: 'Marsa',
      };
    }
  }

  /**
   * دالة تنظيف قوية لمسح تفكير الموديل (Reasoning)
   */
  private cleanDeeply(text: string): string {
    return text
      // 1. مسح أي كلام بين علامات الـ <think> (خاص بموديلات DeepSeek)
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      // 2. مسح المقدمات الشائعة اللي بتشرح البحث
      .replace(/^(First|The user|Based on|I will|Certainly|Sure|Okay|حسناً|إليك|سأقوم)[\s\S]*?(:|\n)/i, '')
      // 3. مسح علامات الاقتباس
      .replace(/^["'«“]|["'»”]$/g, '')
      .trim();
  }
}