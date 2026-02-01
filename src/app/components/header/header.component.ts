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
          <span class="logo-pro">PRO</span>
        </a>

        <nav class="nav" [class.nav-open]="mobileMenuOpen()">
          <a href="#about" class="nav-link" (click)="closeMobile()">
            {{ t().nav.about }}
          </a>
          <a href="#benefits" class="nav-link" (click)="closeMobile()">
            {{ t().nav.benefits }}
          </a>
          <a href="#products" class="nav-link" (click)="closeMobile()">
            {{ t().nav.products }}
          </a>
          <a href="#why-us" class="nav-link" (click)="closeMobile()">
            {{ t().nav.whyUs }}
          </a>
          <a href="#contact" class="nav-link" (click)="closeMobile()">
            {{ t().nav.contact }}
          </a>
        </nav>

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

    .logo-pro {
      font-size: 0.6rem;
      font-weight: 600;
      color: var(--text-secondary);
      padding: 2px 6px;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
    }

    .nav {
      display: flex;
      gap: 2rem;

      @media (max-width: 768px) {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        bottom: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background: var(--bg-dark);
        transform: translateX(100%);
        transition: transform var(--transition-base);

        &.nav-open {
          transform: translateX(0);
        }
      }
    }

    .nav-link {
      color: var(--text-secondary);
      font-weight: 500;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--primary);
      }

      @media (max-width: 768px) {
        font-size: 1.5rem;
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
      padding: 0.5rem;
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

  readonly t = this.translationService.t;
  readonly currentLang = this.translationService.currentLang;
  readonly mobileMenuOpen = signal(false);

  toggleLang(): void {
    this.translationService.toggleLang();
  }

  toggleMobile(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobile(): void {
    this.mobileMenuOpen.set(false);
  }
}
