import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-text">HIBORG</span>
              <span class="logo-pro">PRO</span>
            </div>
            <p class="footer-company">{{ t().footer.company }}</p>
          </div>

          <nav class="footer-nav">
            <a href="#about">{{ t().nav.about }}</a>
            <a href="#benefits">{{ t().nav.benefits }}</a>
            <a href="#products">{{ t().nav.products }}</a>
            <a href="#contact">{{ t().nav.contact }}</a>
          </nav>

          <div class="footer-links">
            <a href="https://tiski.by" target="_blank" rel="noopener" class="main-site-link">
              {{ t().footer.mainSite }}: tiski.by
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} {{ t().footer.company }}. {{ t().footer.rights }}.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-card);
      padding: 4rem 0 2rem;
      border-top: 1px solid var(--border-light);
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }
    }

    .footer-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;

      @media (max-width: 768px) {
        justify-content: center;
      }
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.1em;
    }

    .logo-pro {
      font-size: 0.5rem;
      font-weight: 600;
      color: var(--primary);
      padding: 2px 4px;
      border: 1px solid var(--primary);
      border-radius: 4px;
    }

    .footer-company {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      a {
        color: var(--text-secondary);
        font-size: 0.875rem;
        transition: color var(--transition-fast);

        &:hover {
          color: var(--primary);
        }
      }

      @media (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
      }
    }

    .footer-links {
      @media (max-width: 768px) {
        margin-top: 1rem;
      }
    }

    .main-site-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      font-size: 0.875rem;

      &:hover {
        color: var(--primary-light);
      }
    }

    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid var(--border-light);
      text-align: center;

      p {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  `],
})
export class FooterComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;
  readonly currentYear = new Date().getFullYear();
}
