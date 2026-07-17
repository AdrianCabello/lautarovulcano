import { AfterViewInit, Directive, effect, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService, SiteLanguage } from '../services/language.service';

@Directive({
  selector: '[appPageTranslation]',
  standalone: true,
})
export class PageTranslationDirective implements AfterViewInit, OnDestroy {
  private readonly isBrowser: boolean;
  private observer?: MutationObserver;
  private ready = false;
  private scheduled = false;

  private readonly languageEffect = effect(() => {
    const language = this.language.current();

    if (this.ready) {
      this.scheduleTranslation(language);
    }
  });

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly language: LanguageService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.ready = true;
    this.applyTranslation(this.elementRef.nativeElement, this.language.current());

    this.observer = new MutationObserver(() => this.scheduleTranslation(this.language.current()));
    this.observer.observe(this.elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['aria-label', 'alt', 'placeholder', 'title'],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.languageEffect.destroy();
  }

  private scheduleTranslation(language: SiteLanguage): void {
    if (this.scheduled) {
      return;
    }

    this.scheduled = true;
    queueMicrotask(() => {
      this.scheduled = false;
      this.applyTranslation(this.elementRef.nativeElement, language);
    });
  }

  private applyTranslation(root: HTMLElement, language: SiteLanguage): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const parent = node.parentElement;

      if (parent && !parent.closest('script, style, noscript')) {
        const translated = this.language.translate(node.nodeValue ?? '', language);

        if (translated !== node.nodeValue) {
          node.nodeValue = translated;
        }
      }

      node = walker.nextNode();
    }

    root.querySelectorAll<HTMLElement>('*').forEach((element) => {
      ['aria-label', 'alt', 'placeholder', 'title'].forEach((attribute) => {
        const value = element.getAttribute(attribute);

        if (!value) {
          return;
        }

        const translated = this.language.translate(value, language);

        if (translated !== value) {
          element.setAttribute(attribute, translated);
        }
      });
    });
  }
}
