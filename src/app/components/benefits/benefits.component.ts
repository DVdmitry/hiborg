import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-benefits',
  standalone: true,
  template: `
    <section id="benefits" class="section benefits">
      <div class="container">
        <h2 class="section-title text-center">{{ t().benefits.title }}</h2>

        <div class="benefits-grid">
          @for (item of t().benefits.items; track item.title; let i = $index) {
            <div class="benefit-card card" [style.animation-delay]="i * 0.1 + 's'">
              <div class="benefit-icon">
                @switch (i) {
                  @case (0) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  }
                  @case (1) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  }
                  @case (2) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  }
                  @case (3) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  }
                }
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      margin-bottom: 3rem;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .benefit-card {
      text-align: center;
      padding: 2rem 1.5rem;

      h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
      }

      p {
        font-size: 0.875rem;
        margin: 0 auto;
      }
    }

    .benefit-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(55, 182, 255, 0.2) 0%, rgba(55, 182, 255, 0.05) 100%);
      border-radius: var(--radius-lg);
      color: var(--primary);
      box-shadow: 0 0 30px rgba(55, 182, 255, 0.2);

      svg {
        width: 32px;
        height: 32px;
      }
    }
  `],
})
export class BenefitsComponent {
  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
}
