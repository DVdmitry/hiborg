import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact" class="section contact">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper">
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
            <div class="info-card glass">
              <h3>{{ t().contact.info.address }}</h3>
              <p>{{ t().contact.info.addressValue }}</p>
            </div>

            <div class="info-card glass">
              <h3>{{ t().contact.info.warehouse }}</h3>
              <p>{{ t().contact.info.warehouseValue }}</p>
            </div>

            <div class="info-card glass">
              <h3>{{ t().contact.info.phones }}</h3>
              <p>
                <a href="tel:+375173629899">(017) 362-98-99</a><br/>
                <a href="tel:+375447247736">8 (044) 724-77-36</a><br/>
                <a href="tel:+375295353295">8 (029) 535-32-95</a>
              </p>
            </div>

            <div class="info-card glass">
              <h3>{{ t().contact.info.email }}</h3>
              <p><a href="mailto:info@tiski.by">info&#64;tiski.by</a></p>
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
    // UI only - just show success state
    this.submitted.set(true);
    setTimeout(() => {
      this.submitted.set(false);
      this.formData = { name: '', email: '', phone: '', message: '' };
    }, 3000);
  }
}
