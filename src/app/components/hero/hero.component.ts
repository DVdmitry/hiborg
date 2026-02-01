import { Component, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>

      <div class="container hero-content">
        <div class="hero-logo animate-fadeInUp">
          <div class="logo-badge">
            <span class="logo-text">HIBORG</span>
          </div>
          <span class="logo-pro">PRO</span>
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
      padding-top: 80px;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #000000 0%, #0A1628 50%, #000000 100%);
      z-index: -2;
    }

    .hero-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(55, 182, 255, 0.15) 0%, transparent 70%);
      z-index: -1;
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    }

    .hero-content {
      text-align: center;
      max-width: 800px;
    }

    .hero-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .logo-badge {
      background: var(--bg-dark);
      border: 3px solid var(--text-primary);
      border-radius: var(--radius-lg);
      padding: 1rem 2.5rem;
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
      font-size: clamp(2rem, 6vw, 4rem);
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.15em;
      text-shadow: 0 0 30px rgba(55, 182, 255, 0.5);
    }

    .logo-pro {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary);
      padding: 0.25rem 0.75rem;
      border: 1px solid var(--primary);
      border-radius: var(--radius-sm);
    }

    .hero-title {
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .hero-description {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto 2.5rem;
      color: var(--text-secondary);
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 4rem;
    }

    .hero-stats {
      display: flex;
      gap: 3rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary);
      text-shadow: 0 0 20px rgba(55, 182, 255, 0.3);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-muted);
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
