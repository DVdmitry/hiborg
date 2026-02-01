import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header glass">
      <div class="container header-inner">
        <a href="#" class="logo">
          <span class="logo-text">HIBORG</span>
        </a>

        <nav class="nav">
          <a href="#about" class="nav-link">{{ t().nav.about }}</a>
          <a href="#benefits" class="nav-link">{{ t().nav.benefits }}</a>
          <a href="#products" class="nav-link">{{ t().nav.products }}</a>
          <a href="#why-us" class="nav-link">{{ t().nav.whyUs }}</a>
          <a href="#contact" class="nav-link">{{ t().nav.contact }}</a>
        </nav>

        <!-- Mobile Full-Screen Menu -->
        <div class="mobile-menu" [class.open]="mobileMenuOpen()">
          <div class="mobile-menu-header">
            <span class="mobile-logo">HIBORG</span>
            <button class="mobile-close" (click)="closeMobile()" aria-label="Close menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="mobile-menu-content">
            <a href="#about" class="mobile-link" (click)="closeMobile()">{{ t().nav.about }}</a>
            <a href="#benefits" class="mobile-link" (click)="closeMobile()">{{ t().nav.benefits }}</a>
            <a href="#products" class="mobile-link" (click)="closeMobile()">{{ t().nav.products }}</a>
            <a href="#why-us" class="mobile-link" (click)="closeMobile()">{{ t().nav.whyUs }}</a>
            <a href="#contact" class="mobile-link" (click)="closeMobile()">{{ t().nav.contact }}</a>
          </div>
          <div class="mobile-menu-footer">
            <button class="mobile-lang" (click)="toggleLang()">
              {{ currentLang() === 'ru' ? 'English' : 'Русский' }}
            </button>
          </div>
        </div>

        <div class="header-actions">
          <button class="lang-switcher" (click)="toggleLang()">
            {{ currentLang() === 'ru' ? 'EN' : 'RU' }}
          </button>

          <button
            class="mobile-toggle"
            (click)="toggleMobile()"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle menu"
          >
            <span class="hamburger" [class.active]="mobileMenuOpen()"></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem 0;
      transition: all var(--transition-base);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 768px) {
        padding-right: 3rem;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.1em;
    }


    .nav {
      display: flex;
      gap: 2rem;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .nav-link {
      color: var(--text-secondary);
      font-weight: 500;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--primary);
      }
    }

    /* ========== MOBILE FULL-SCREEN MENU ========== */
    .mobile-menu {
      display: none;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.3s ease, visibility 0.3s ease;

        &.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
      }
    }

    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 3rem 1.25rem 1.5rem;
      background: #000000;
      border-bottom: 1px solid #333333;
    }

    .mobile-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.1em;
    }

    .mobile-close {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--border-light);
      border-radius: 50%;
      color: var(--text-primary);
      cursor: pointer;
      transition: all var(--transition-fast);

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        border-color: var(--primary);
        color: var(--primary);
      }
    }

    .mobile-menu-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 2rem;
      background: #000000;
    }

    .mobile-link {
      display: block;
      width: 100%;
      max-width: 300px;
      padding: 1.25rem 2rem;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--bg-elevated);
        color: var(--primary);
      }
    }

    .mobile-menu.open .mobile-link {
      animation: fadeInUp 0.4s ease forwards;
      opacity: 0;

      &:nth-child(1) { animation-delay: 0.05s; }
      &:nth-child(2) { animation-delay: 0.1s; }
      &:nth-child(3) { animation-delay: 0.15s; }
      &:nth-child(4) { animation-delay: 0.2s; }
      &:nth-child(5) { animation-delay: 0.25s; }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .mobile-menu-footer {
      padding: 1.5rem;
      background: #000000;
      border-top: 1px solid #333333;
      display: flex;
      justify-content: center;
    }

    .mobile-lang {
      padding: 0.875rem 2rem;
      background: transparent;
      border: 1px solid var(--primary);
      border-radius: var(--radius-full);
      color: var(--primary);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        background: var(--primary);
        color: var(--bg-dark);
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .lang-switcher {
      background: transparent;
      border: 1px solid var(--border-light);
      color: var(--text-primary);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--primary);
        color: var(--primary);
      }
    }

    .mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      padding: 0.75rem;
      cursor: pointer;

      @media (max-width: 768px) {
        display: block;
      }
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      position: relative;
      transition: background var(--transition-fast);

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        transition: transform var(--transition-base);
      }

      &::before { top: -8px; }
      &::after { bottom: -8px; }

      &.active {
        background: transparent;

        &::before {
          transform: translateY(8px) rotate(45deg);
        }

        &::after {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }
  `],
})
export class HeaderComponent {
  private readonly translationService = inject(TranslationService);

  protected readonly t = this.translationService.t;
  protected readonly currentLang = this.translationService.currentLang;
  protected readonly mobileMenuOpen = signal(false);

  protected toggleLang(): void {
    this.translationService.toggleLang();
  }

  protected toggleMobile(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  protected closeMobile(): void {
    this.mobileMenuOpen.set(false);
  }
}
