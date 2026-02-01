import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

const SUCCESS_STATE_DURATION_MS = 3000;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, AnimateOnScrollDirective],
  template: `
    <section id="contact" class="section contact">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper" appAnimateOnScroll animationType="fadeInLeft">
            <h2 class="section-title">{{ t().contact.title }}</h2>
            <p class="contact-description">{{ t().contact.description }}</p>

            <form class="contact-form" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <input
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  [placeholder]="t().contact.form.name"
                  required
                  class="form-input"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    [placeholder]="t().contact.form.email"
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="tel"
                    [(ngModel)]="formData.phone"
                    name="phone"
                    [placeholder]="t().contact.form.phone"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <textarea
                  [(ngModel)]="formData.message"
                  name="message"
                  [placeholder]="t().contact.form.message"
                  rows="4"
                  required
                  class="form-input"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-full" [disabled]="submitted()">
                @if (submitted()) {
                  {{ currentLang() === 'ru' ? 'Отправлено!' : 'Sent!' }}
                } @else {
                  {{ t().contact.form.submit }}
                }
              </button>
            </form>
          </div>

          <div class="contact-info">
            <div class="info-card glass" appAnimateOnScroll animationType="fadeInRight" [animationDelay]="0">
              <h3>{{ t().contact.info.address }}</h3>
              <p>{{ t().contact.info.addressValue }}</p>
            </div>

            <div class="info-card glass" appAnimateOnScroll animationType="fadeInRight" [animationDelay]="100">
              <h3>{{ t().contact.info.warehouse }}</h3>
              <p>{{ t().contact.info.warehouseValue }}</p>
            </div>

            <div class="info-card glass" appAnimateOnScroll animationType="fadeInRight" [animationDelay]="200">
              <h3>{{ t().contact.info.phones }}</h3>
              <p>
                <a href="tel:+375173629899">(017) 362-98-99</a><br/>
                <a href="tel:+375447247736">8 (044) 724-77-36</a><br/>
                <a href="tel:+375295353295">8 (029) 535-32-95</a>
              </p>
            </div>

            <div class="info-card glass" appAnimateOnScroll animationType="fadeInRight" [animationDelay]="300">
              <h3>{{ t().contact.info.email }}</h3>
              <p><a href="mailto:info@tiski.by">info&#64;tiski.by</a></p>
            </div>

            <div class="map-container" appAnimateOnScroll animationType="fadeInRight" [animationDelay]="400">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.482%2C53.897%2C27.522%2C53.917&layer=mapnik&marker=53.907%2C27.502"
                width="100%"
                height="200"
                style="border: 0; border-radius: var(--radius-md);"
                allowfullscreen
                loading="lazy"
                title="HIBORG Office Location"
              ></iframe>
              <a
                href="https://www.openstreetmap.org/?mlat=53.907&mlon=27.502#map=15/53.907/27.502"
                target="_blank"
                rel="noopener"
                class="map-link"
              >
                {{ currentLang() === 'ru' ? 'Открыть на карте' : 'Open in maps' }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;

      @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .section-title {
      margin-bottom: 0.5rem;
    }

    .contact-description {
      margin-bottom: 2rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .form-input {
      width: 100%;
      padding: 1rem 1.25rem;
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 1rem;
      font-family: inherit;
      transition: all var(--transition-fast);
      resize: vertical;

      &::placeholder {
        color: var(--text-muted);
      }

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(55, 182, 255, 0.1);
      }
    }

    textarea.form-input {
      min-height: 120px;
    }

    .btn-full {
      width: 100%;
      margin-top: 0.5rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-card {
      padding: 1.5rem;
      border-radius: var(--radius-md);

      h3 {
        color: var(--primary);
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text-primary);
        font-size: 1rem;
        line-height: 1.6;
      }

      a {
        color: var(--text-primary);
        transition: color var(--transition-fast);

        &:hover {
          color: var(--primary);
        }
      }
    }

    .map-container {
      border-radius: var(--radius-md);
      overflow: hidden;
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);

      iframe {
        display: block;
        filter: grayscale(50%) invert(92%) hue-rotate(180deg);
      }
    }

    .map-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      color: var(--primary);
      font-size: 0.875rem;
      font-weight: 500;
      transition: all var(--transition-fast);

      &:hover {
        background: rgba(55, 182, 255, 0.1);
      }
    }
  `],
})
export class ContactComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;
  readonly currentLang = this.translationService.currentLang;
  readonly submitted = signal(false);

  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  onSubmit(): void {
    // Create mailto link with form data
    const subject = encodeURIComponent(
      this.currentLang() === 'ru'
        ? `Заявка с сайта HIBORG от ${this.formData.name}`
        : `HIBORG Website Inquiry from ${this.formData.name}`
    );

    const body = encodeURIComponent(
      this.currentLang() === 'ru'
        ? `Имя: ${this.formData.name}\nEmail: ${this.formData.email}\nТелефон: ${this.formData.phone || 'Не указан'}\n\nСообщение:\n${this.formData.message}`
        : `Name: ${this.formData.name}\nEmail: ${this.formData.email}\nPhone: ${this.formData.phone || 'Not provided'}\n\nMessage:\n${this.formData.message}`
    );

    // Open mailto link
    window.location.href = `mailto:info@tiski.by?subject=${subject}&body=${body}`;

    // Show success state
    this.submitted.set(true);
    setTimeout(() => {
      this.submitted.set(false);
      this.formData = { name: '', email: '', phone: '', message: '' };
    }, SUCCESS_STATE_DURATION_MS);
  }
}
