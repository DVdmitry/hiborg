import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { inject } from '@angular/core';

interface Product {
  id: string;
  image: string;
  nameRu: string;
  nameEn: string;
}

const AUTO_ROTATE_INTERVAL_MS = 4000;

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  template: `
    <section class="showcase">
      <div class="container">
        <div class="showcase-header">
          <h2 class="showcase-title">{{ currentLang() === 'ru' ? 'Наша продукция' : 'Our Products' }}</h2>
          <p class="showcase-subtitle">{{ currentLang() === 'ru' ? 'Качественные инструменты для профессионалов' : 'Quality tools for professionals' }}</p>
        </div>

        <div class="carousel-container">
          <button class="carousel-btn prev" (click)="prev()" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div class="carousel-track">
            @for (product of visibleProducts(); track product.id; let i = $index) {
              <div
                class="carousel-item"
                [class.active]="i === 1"
                [class.prev]="i === 0"
                [class.next]="i === 2"
              >
                <div class="product-card">
                  <div class="product-image-wrapper">
                    <div class="product-glow"></div>
                    <img
                      [src]="product.image"
                      [alt]="currentLang() === 'ru' ? product.nameRu : product.nameEn"
                      class="product-image"
                    />
                  </div>
                  <h3 class="product-name">{{ currentLang() === 'ru' ? product.nameRu : product.nameEn }}</h3>
                </div>
              </div>
            }
          </div>

          <button class="carousel-btn next" (click)="next()" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div class="carousel-dots">
          @for (product of products; track product.id; let i = $index) {
            <button
              class="dot"
              [class.active]="i === currentIndex()"
              (click)="goTo(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1)"
            ></button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .showcase {
      padding: 6rem 0;
      background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 50%, var(--bg-dark) 100%);
      overflow: hidden;

      @media (max-width: 768px) {
        padding: 4rem 0;
      }
    }

    .showcase-header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 0 1rem;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }
    }

    .showcase-title {
      font-size: clamp(2rem, 5vw, 3rem);
      margin-bottom: 1rem;
      background: linear-gradient(90deg, var(--text-primary) 0%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .showcase-subtitle {
      color: var(--text-secondary);
      font-size: 1.125rem;
    }

    .carousel-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      position: relative;
      padding: 2rem 0;
    }

    .carousel-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--bg-glass);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-light);
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-base);
      flex-shrink: 0;
      z-index: 10;

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        background: var(--primary);
        border-color: var(--primary);
        box-shadow: var(--glow-primary);
        transform: scale(1.1);
      }

      @media (max-width: 768px) {
        width: 44px;
        height: 44px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .carousel-track {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      perspective: 1000px;

      @media (max-width: 768px) {
        gap: 1rem;
      }
    }

    .carousel-item {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;

      &.prev {
        transform: translateX(-20%) scale(0.8) rotateY(15deg);
        opacity: 0.5;
        z-index: 1;

        @media (max-width: 640px) {
          display: none;
        }
      }

      &.active {
        transform: translateX(0) scale(1) rotateY(0);
        opacity: 1;
        z-index: 2;
      }

      &.next {
        transform: translateX(20%) scale(0.8) rotateY(-15deg);
        opacity: 0.5;
        z-index: 1;

        @media (max-width: 640px) {
          display: none;
        }
      }
    }

    .product-card {
      text-align: center;
    }

    .product-image-wrapper {
      position: relative;
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        width: 260px;
        height: 260px;
      }

      @media (max-width: 480px) {
        width: 220px;
        height: 220px;
      }
    }

    .product-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(55, 182, 255, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      animation: pulse-glow 3s ease-in-out infinite;
    }

    @keyframes pulse-glow {
      0%, 100% {
        opacity: 0.5;
        transform: scale(0.9);
      }
      50% {
        opacity: 1;
        transform: scale(1.1);
      }
    }

    .product-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
      transition: transform 0.5s ease;
    }

    .carousel-item.active .product-image {
      animation: float 4s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-15px);
      }
    }

    .product-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 3rem;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border-light);
      border: none;
      cursor: pointer;
      transition: all var(--transition-base);
      padding: 0;

      &:hover {
        background: var(--text-muted);
      }

      &.active {
        background: var(--primary);
        box-shadow: 0 0 10px rgba(55, 182, 255, 0.5);
        transform: scale(1.2);
      }
    }
  `],
})
export class ProductShowcaseComponent implements OnInit, OnDestroy {
  private readonly translationService = inject(TranslationService);
  readonly currentLang = this.translationService.currentLang;

  readonly products: Product[] = [
    { id: '1', image: '/assets/images/products/knife.png', nameRu: 'Нож с выдвижным лезвием', nameEn: 'Utility Knife' },
    { id: '2', image: '/assets/images/products/drills-hss.png', nameRu: 'Свёрла HSS по металлу', nameEn: 'HSS Metal Drill Bits' },
    { id: '3', image: '/assets/images/products/drill-concrete.png', nameRu: 'Бур по бетону SDS+', nameEn: 'SDS+ Concrete Drill' },
    { id: '4', image: '/assets/images/products/mallet-rubber.png', nameRu: 'Киянка резиновая', nameEn: 'Rubber Mallet' },
    { id: '5', image: '/assets/images/products/mallet-plastic.png', nameRu: 'Киянка с пластиковым бойком', nameEn: 'Plastic Head Mallet' },
    { id: '6', image: '/assets/images/products/crowbar.png', nameRu: 'Гвоздодёр', nameEn: 'Crowbar' },
    { id: '7', image: '/assets/images/products/sealant-gun.png', nameRu: 'Пистолет для герметика', nameEn: 'Sealant Gun' },
  ];

  currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  visibleProducts = computed(() => {
    const idx = this.currentIndex();
    const len = this.products.length;
    return [
      this.products[(idx - 1 + len) % len],
      this.products[idx],
      this.products[(idx + 1) % len],
    ];
  });

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => this.next(), AUTO_ROTATE_INTERVAL_MS);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next(): void {
    this.currentIndex.update(i => (i + 1) % this.products.length);
  }

  prev(): void {
    this.currentIndex.update(i => (i - 1 + this.products.length) % this.products.length);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
