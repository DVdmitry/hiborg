import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  template: `
    <section id="products" class="section products">
      <div class="container">
        <div class="products-header text-center">
          <h2 class="section-title">{{ t().products.title }}</h2>
          <p class="products-description">{{ t().products.description }}</p>
        </div>

        <div class="products-grid">
          @for (cat of t().products.categories; track cat.name; let i = $index) {
            <div class="product-card card">
              <div class="product-icon">
                @switch (i) {
                  @case (0) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  }
                  @case (1) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  }
                  @case (2) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v10M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h10M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>
                    </svg>
                  }
                  @case (3) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  }
                  @case (4) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  }
                  @case (5) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                    </svg>
                  }
                }
              </div>
              <h3>{{ cat.name }}</h3>
              <span class="product-count">{{ cat.count }}</span>
            </div>
          }
        </div>

        <div class="products-cta text-center">
          <a href="https://tiski.by" target="_blank" rel="noopener" class="btn btn-primary">
            {{ t().products.cta }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
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
    .products {
      background: var(--bg-card);
    }

    .section-title {
      margin-bottom: 1rem;
    }

    .products-description {
      font-size: 1.125rem;
      margin-bottom: 3rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;

      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .product-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
      cursor: pointer;

      h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }
    }

    .product-icon {
      width: 72px;
      height: 72px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-elevated);
      border-radius: var(--radius-lg);
      color: var(--primary);
      transition: all var(--transition-base);

      svg {
        width: 36px;
        height: 36px;
      }
    }

    .product-card:hover .product-icon {
      background: var(--primary);
      color: var(--bg-dark);
      box-shadow: var(--glow-primary);
    }

    .product-count {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
    }

    .products-cta {
      .btn {
        gap: 0.5rem;
      }
    }
  `],
})
export class ProductsComponent {
  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
}
