import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

// تعريف الأنواع لضمان الاحترافية في الكود (Type-Safety)
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

  // الرابط الجديد المتوافق مع الـ Router والبروكسي
  private readonly apiUrl = '/marsa-api/v1/chat/completions';
  async generateMarsaEcho(
    prompt: string,
    type: MarsaVibe,
    lang: MarsaLang,
  ): Promise<MarsaEchoResponse> {
    // 🔥 البرومبت "المرعب": تم تصميمه ليقتل "الهبد" ويمنع تكرار كلمة المستخدم
    const systemPrompt = `
      [STRICT IDENTITY]: You are "MARSA ENGINE", a verified textual retrieval system. 
      [CORE MISSION]: Your ONLY job is to find and return EXISTING, AUTHENTIC text. You are NOT a writer.

      [STRICT CATEGORY RULES]:
      1. [quran]: Retrieve a 100% accurate Verse (Ayah) from the Holy Quran. Accuracy is mandatory. NEVER paraphrase. 
      2. [lyric]: Retrieve genuine song lyrics from legendary Arab artists (e.g., Abbadi Al-Johar, Talal Maddah). NEVER invent lyrics.
      3. [quote]: Retrieve a verified quote from a real historical or literary figure. 

      [NEGATIVE CONSTRAINTS - VERY IMPORTANT]:
      - NO ECHOING: Never repeat the user's input as the result. If the user writes "يوسف", don't start the answer with "يوسف".
      - NO HALLUCINATION: If you don't find a real match, do not invent text. 
      - NO CHATTER: Do not say "Sure", "Here is", or any introductory words.
      - VARIETY: Provide different authentic results for the same keyword each time.

      [OUTPUT FORMAT]:
      - Format: "TEXT | SOURCE"
      - Example: "قالوا تمنى قلت ضحكة عيونه | عبادي الجوهر"
    `;

    const body = {
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `SEARCH_REQUEST: [Category: ${type}] [Keyword: ${prompt}]. Find 1 diverse, real text. Return format: TEXT | SOURCE.`,
        },
      ],
      // 0 للقرآن لضمان الدقة المطلقة، و 0.7 للباقي لضمان التنويع
      temperature: type === 'quran' ? 0.0 : 0.7,
      max_tokens: 180,
      top_p: 0.9,
      presence_penalty: 0.6, // لمنع الموديل من تكرار نفس الردود
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    try {
      const response: any = await firstValueFrom(this.http.post(this.apiUrl, body, { headers }));
      let rawResponse = response.choices[0].message.content.trim();

      rawResponse = this.cleanResponse(rawResponse);

      if (rawResponse.includes('|')) {
        const [content, ...authorParts] = rawResponse.split('|');
        const author = authorParts.join('|').trim();
        const cleanContent = content.trim();

        // حماية برمجية ضد الـ Echo (لو الموديل بعت نفس كلمتك)
        if (cleanContent.toLowerCase() === prompt.toLowerCase()) {
          throw new Error('AI Echoed Input');
        }

        return {
          content: cleanContent,
          author: author || (lang === 'ar' ? 'غير معروف' : 'Unknown'),
        };
      }

      return { content: rawResponse, author: lang === 'ar' ? 'غير معروف' : 'Unknown' };
    } catch (error: any) {
      console.error('Marsa Service Error:', error);
      return {
        content:
          lang === 'ar'
            ? 'أبحرتُ بعيداً ولم أجد صدىً حقيقياً.. جرب كلمة أخرى.'
            : 'I sailed far but found no authentic echo.. try another word.',
        author: lang === 'ar' ? 'مَرسى' : 'Marsa',
      };
    }
  }

  private cleanResponse(text: string): string {
    return text
      .replace(/^(حسناً|تفضل|إليك|بالتأكيد|طيب|Sure|Here is|Certainly|Of course)[،.:\s]*/i, '')
      .replace(/^["'«“]|["'»”]$/g, '')
      .trim();
  }
}
