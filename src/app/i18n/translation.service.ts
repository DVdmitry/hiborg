import { Injectable, signal, computed } from '@angular/core';
import { ru } from './ru';
import { en } from './en';

export type Language = 'ru' | 'en';
export type Translations = typeof ru;

const STORAGE_KEY = 'hiborg-lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly translations = { ru, en };

  readonly currentLang = signal<Language>(this.getInitialLang());
  readonly t = computed(() => this.translations[this.currentLang()]);

  private getInitialLang(): Language {
    if (typeof window === 'undefined') {
      return 'ru';
    }
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && (saved === 'ru' || saved === 'en')) {
      return saved;
    }
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'en' ? 'en' : 'ru';
  }

  setLang(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  toggleLang(): void {
    const next = this.currentLang() === 'ru' ? 'en' : 'ru';
    this.setLang(next);
  }
}
