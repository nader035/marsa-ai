import { Injectable } from '@angular/core';
import { toPng } from 'html-to-image';

@Injectable({ providedIn: 'root' })
export class ShareService {
  async shareCard(elementId: string) {
    const node = document.getElementById(elementId);
    if (!node) return;

    try {
      // 1. توليد الـ Data URL
      // تم إزالة لون الخلفية الثابت عشان يحترم الكارت في وضع الـ Light والـ Dark بشكل تلقائي
      const dataUrl = await toPng(node, {
        pixelRatio: 3,
        cacheBust: true,
        // أضفنا ستايل بسيط لضمان أن زوايا الكارت الدائرية تظهر بشكل سليم في الصورة
        style: {
          borderRadius: '3.5rem',
        },
      });

      // 2. تحويل الـ Data URL إلى Blob يدوياً لتجاوز حماية الـ CSP
      const blob = this.dataURItoBlob(dataUrl);
      const file = new File([blob], `Marsa-${Date.now()}.png`, { type: 'image/png' });

      // 3. المشاركة أو التحميل
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Marsa AI',
          // نص مباشر، احترافي، وبدون فلسفة، ومكتوب باللغتين عشان يرضي كل المستخدمين
          text: 'مشاركة من تطبيق مَرسى | Shared via Marsa AI',
        });
      } else {
        this.downloadFallback(dataUrl);
      }
    } catch (error) {
      console.error('Error sharing card:', error);
    }
  }

  // دالة تحويل يدوية لا تحتاج لـ fetch
  private dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  private downloadFallback(dataUrl: string) {
    const link = document.createElement('a');
    // تم تبسيط اسم الصورة المحملة
    link.download = `Marsa-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }
}
