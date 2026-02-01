import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="hero-bg">
        <img src="/assets/images/hero-bg.jpg" alt="" class="hero-bg-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-glow"></div>

      <div class="container hero-content">
        <div class="hero-logo animate-fadeInUp">
          <div class="logo-badge">
            <span class="logo-text">HIBORG</span>
          </div>
        </div>

        <h1 class="hero-title animate-fadeInUp" style="animation-delay: 0.1s">
          {{ t().hero.subtitle }}
        </h1>

        <p class="hero-description animate-fadeInUp" style="animation-delay: 0.2s">
          {{ t().hero.description }}
        </p>

        <div class="hero-actions animate-fadeInUp" style="animation-delay: 0.3s">
          <a href="#products" class="btn btn-primary animate-pulse">
            {{ t().hero.cta }}
          </a>
          <a href="#contact" class="btn btn-outline">
            {{ t().hero.ctaSecondary }}
          </a>
        </div>

        <div class="hero-stats animate-fadeInUp" style="animation-delay: 0.4s">
          <div class="stat">
            <span class="stat-value">500+</span>
            <span class="stat-label">{{ t().products.categories[0].name }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">10+</span>
            <span class="stat-label">{{ currentLang() === 'ru' ? 'Лет опыта' : 'Years Experience' }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">1000+</span>
            <span class="stat-label">{{ currentLang() === 'ru' ? 'Клиентов' : 'Clients' }}</span>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <span>{{ currentLang() === 'ru' ? 'Листайте вниз' : 'Scroll down' }}</span>
        <div class="scroll-indicator"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 120px var(--space-md) 80px;

      @media (max-width: 768px) {
        padding: 100px var(--space-sm) 60px;
      }
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: -2;
    }

    .hero-bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.8) 100%
      );
    }

    .hero-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(55, 182, 255, 0.2) 0%, transparent 70%);
      z-index: -1;
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    }

    .hero-content {
      text-align: center;
      max-width: 900px;
      padding: var(--space-lg) 0;
    }

    .hero-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .logo-badge {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      border: 3px solid var(--text-primary);
      border-radius: var(--radius-lg);
      padding: 1.25rem 3rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px solid var(--border-light);
        border-radius: calc(var(--radius-lg) - 4px);
      }
    }

    .logo-text {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.15em;
      text-shadow: 0 0 40px rgba(55, 182, 255, 0.6);
    }

    .hero-title {
      margin-bottom: 2rem;
      color: var(--text-primary);
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    }

    .hero-description {
      font-size: 1.375rem;
      max-width: 650px;
      margin: 0 auto 3rem;
      color: var(--text-secondary);
      line-height: 1.7;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

      @media (max-width: 768px) {
        font-size: 1.125rem;
      }
    }

    .hero-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 4rem;
    }

    .hero-stats {
      display: flex;
      gap: 4rem;
      justify-content: center;
      flex-wrap: wrap;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-light);

      @media (max-width: 768px) {
        gap: 2rem;
        padding: 1.5rem;
      }
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary);
      text-shadow: 0 0 30px rgba(55, 182, 255, 0.4);

      @media (max-width: 768px) {
        font-size: 2.25rem;
      }
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .hero-scroll {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .scroll-indicator {
      width: 24px;
      height: 40px;
      border: 2px solid var(--border-light);
      border-radius: 12px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 8px;
        background: var(--primary);
        border-radius: 2px;
        animation: scroll 1.5s ease-in-out infinite;
      }
    }

    @keyframes scroll {
      0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
      50% { opacity: 0.5; transform: translateX(-50%) translateY(12px); }
    }
  `],
})
export class HeroComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;
  readonly currentLang = this.translationService.currentLang;
}
