import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  template: `
    <section id="why-us" class="section why-us">
      <div class="container">
        <h2 class="section-title text-center" appAnimateOnScroll animationType="fadeInUp">{{ t().whyUs.title }}</h2>

        <div class="reasons-grid">
          @for (reason of t().whyUs.reasons; track reason.title; let i = $index) {
            <div class="reason-card" appAnimateOnScroll animationType="fadeInUp" [animationDelay]="i * 150">
              <div class="reason-number">0{{ i + 1 }}</div>
              <div class="reason-content">
                <h3>{{ reason.title }}</h3>
                <p>{{ reason.description }}</p>
              </div>
              <div class="reason-line"></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      margin-bottom: 4rem;
    }

    .reasons-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .reason-card {
      display: flex;
      gap: 1.5rem;
      padding: 2rem;
      background: var(--bg-card);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light);
      position: relative;
      overflow: hidden;
      transition: all var(--transition-base);

      &:hover {
        border-color: var(--border-accent);
        transform: translateX(8px);

        .reason-number {
          color: var(--primary);
          text-shadow: 0 0 30px rgba(55, 182, 255, 0.5);
        }

        .reason-line {
          width: 100%;
        }
      }
    }

    .reason-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--border-light);
      line-height: 1;
      transition: all var(--transition-base);
    }

    .reason-content {
      flex: 1;

      h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.875rem;
      }
    }

    .reason-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary) 0%, transparent 100%);
      transition: width var(--transition-slow);
    }
  `],
})
export class WhyUsComponent {
  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
}
