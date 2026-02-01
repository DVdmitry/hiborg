import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="section about">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <h2 class="section-title">{{ t().about.title }}</h2>
            <p class="about-description">{{ t().about.description }}</p>
            <p class="about-mission">{{ t().about.mission }}</p>
          </div>

          <div class="about-values">
            <div class="value-card card">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>{{ t().about.values.quality.title }}</h3>
              <p>{{ t().about.values.quality.description }}</p>
            </div>

            <div class="value-card card">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>{{ t().about.values.reliability.title }}</h3>
              <p>{{ t().about.values.reliability.description }}</p>
            </div>

            <div class="value-card card">
              <div class="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>{{ t().about.values.affordability.title }}</h3>
              <p>{{ t().about.values.affordability.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background: var(--bg-card);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .section-title {
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .about-description {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      line-height: 1.8;
    }

    .about-mission {
      color: var(--primary);
      font-style: italic;
      padding-left: 1rem;
      border-left: 3px solid var(--primary);
    }

    .about-values {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .value-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      h3 {
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }

      p {
        font-size: 0.875rem;
      }
    }

    .value-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(55, 182, 255, 0.1);
      border-radius: var(--radius-md);
      color: var(--primary);

      svg {
        width: 24px;
        height: 24px;
      }
    }
  `],
})
export class AboutComponent {
  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
}
