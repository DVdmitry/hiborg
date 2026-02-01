import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  template: `
    <section id="partners" class="section partners">
      <div class="container">
        <h2 class="section-title text-center">{{ t().partners.title }}</h2>
        <p class="partners-description text-center">{{ t().partners.description }}</p>

        <div class="partners-logos">
          <div class="partner-logo">
            <span>Hoegert Technik</span>
          </div>
          <div class="partner-logo">
            <span>Ремоколор</span>
          </div>
          <div class="partner-logo">
            <span>ERA</span>
          </div>
          <div class="partner-logo">
            <span>GAZ</span>
          </div>
        </div>

        <div class="where-to-buy glass">
          <div class="wtb-content">
            <h3>{{ t().partners.whereToBuy }}</h3>
            <p>{{ t().partners.whereToBuyDesc }}</p>
          </div>
          <a href="https://tiski.by" target="_blank" rel="noopener" class="btn btn-primary">
            {{ t().partners.mainSite }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .partners {
      background: var(--bg-card);
    }

    .section-title {
      margin-bottom: 1rem;
    }

    .partners-description {
      margin-bottom: 3rem;
    }

    .partners-logos {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      margin-bottom: 4rem;
    }

    .partner-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 2.5rem;
      background: var(--bg-elevated);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      transition: all var(--transition-base);

      span {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-muted);
        transition: color var(--transition-base);
      }

      &:hover {
        border-color: var(--border-accent);
        box-shadow: var(--glow-primary);

        span {
          color: var(--primary);
        }
      }
    }

    .where-to-buy {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 3rem;
      border-radius: var(--radius-lg);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
      }
    }

    .wtb-content {
      h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.875rem;
        max-width: 400px;
      }
    }
  `],
})
export class PartnersComponent {
  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
}
