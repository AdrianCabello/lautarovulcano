import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ES_TO_EN } from '../i18n/translations';

export type SiteLanguage = 'es' | 'en';

const EN_TO_ES = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([spanish, english]) => [english, spanish])
);

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<SiteLanguage>('es');
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const stored = window.localStorage.getItem('lv-language');
      this.current.set(stored === 'en' ? 'en' : 'es');
      document.documentElement.lang = this.current();
    }
  }

  toggle(): void {
    const next = this.current() === 'es' ? 'en' : 'es';
    this.current.set(next);

    if (this.isBrowser) {
      window.localStorage.setItem('lv-language', next);
      document.documentElement.lang = next;
    }
  }

  translate(value: string, target = this.current()): string {
    const leading = value.match(/^\s*/)?.[0] ?? '';
    const trailing = value.match(/\s*$/)?.[0] ?? '';
    const normalized = value.trim().replace(/\s+/g, ' ');

    if (!normalized) {
      return value;
    }

    const translated = target === 'en'
      ? ES_TO_EN[normalized] ?? this.translatePattern(normalized, 'en')
      : EN_TO_ES[normalized] ?? this.translatePattern(normalized, 'es');

    return translated === normalized ? value : `${leading}${translated}${trailing}`;
  }

  private translatePattern(value: string, target: SiteLanguage): string {
    const patterns = target === 'en'
      ? [
          [/^Explorar los (\d+) trabajos$/, 'Explore all $1 projects'],
          [/^Ver (.+) en Behance$/, 'View $1 on Behance'],
          [/^Ver Instagram de (.+)$/, 'View $1 on Instagram'],
          [/^Abrir web de (.+)$/, 'Open $1 website'],
          [/^Web de (.+)$/, '$1 website'],
          [/^(.+) - Antes$/, '$1 - Before'],
          [/^(.+) - Después$/, '$1 - After'],
        ] as const
      : [
          [/^Explore all (\d+) projects$/, 'Explorar los $1 trabajos'],
          [/^View (.+) on Behance$/, 'Ver $1 en Behance'],
          [/^View (.+) on Instagram$/, 'Ver Instagram de $1'],
          [/^Open (.+) website$/, 'Abrir web de $1'],
          [/^(.+) website$/, 'Web de $1'],
          [/^(.+) - Before$/, '$1 - Antes'],
          [/^(.+) - After$/, '$1 - Después'],
        ] as const;

    for (const [pattern, replacement] of patterns) {
      if (pattern.test(value)) {
        return value.replace(pattern, replacement);
      }
    }

    return this.translateDate(value, target);
  }

  private translateDate(value: string, target: SiteLanguage): string {
    const months = target === 'en'
      ? { Ene: 'Jan', Abr: 'Apr', Ago: 'Aug', Dic: 'Dec' }
      : { Jan: 'Ene', Apr: 'Abr', Aug: 'Ago', Dec: 'Dic' };

    return value.replace(
      /\b(Ene|Abr|Ago|Dic|Jan|Apr|Aug|Dec)\b/g,
      (month) => months[month as keyof typeof months] ?? month
    );
  }
}
