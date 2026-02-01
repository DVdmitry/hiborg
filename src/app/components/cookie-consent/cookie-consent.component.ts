import { Component, inject, signal, OnInit } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

const BANNER_SHOW_DELAY_MS = 1500;

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  template: `
    @if (showBanner()) {
      <div class="cookie-banner">
        <div class="cookie-content">
          <div class="cookie-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="8" cy="9" r="1" fill="currentColor"/>
              <circle cx="15" cy="8" r="1" fill="currentColor"/>
              <circle cx="10" cy="14" r="1" fill="currentColor"/>
              <circle cx="16" cy="13" r="1" fill="currentColor"/>
              <circle cx="12" cy="17" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div class="cookie-text">
            <p>
              {{ currentLang() === 'ru'
                ? 'Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей'
                : 'We use cookies to improve your experience. By continuing to use this site, you agree to our' }}
              <a href="#" (click)="showPrivacy($event)">
                {{ currentLang() === 'ru' ? 'политикой конфиденциальности' : 'privacy policy' }}
              </a>.
            </p>
          </div>
          <div class="cookie-actions">
            <button class="btn btn-outline btn-sm" (click)="decline()">
              {{ currentLang() === 'ru' ? 'Отклонить' : 'Decline' }}
            </button>
            <button class="btn btn-primary btn-sm" (click)="accept()">
              {{ currentLang() === 'ru' ? 'Принять' : 'Accept' }}
            </button>
          </div>
        </div>
      </div>
    }

    @if (showPrivacyModal()) {
      <div class="modal-overlay" (click)="closePrivacy()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closePrivacy()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <h2>{{ currentLang() === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy' }}</h2>

          <div class="modal-body">
            @if (currentLang() === 'ru') {
              <h3>1. Общие положения</h3>
              <p>Настоящая политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта hiborg.by, принадлежащего ООО «Территория инструмента».</p>

              <h3>2. Какие данные мы собираем</h3>
              <p>При использовании сайта мы можем собирать следующие данные:</p>
              <ul>
                <li>Имя и контактные данные (при заполнении формы обратной связи)</li>
                <li>Email и номер телефона</li>
                <li>Техническая информация (IP-адрес, тип браузера, cookies)</li>
              </ul>

              <h3>3. Цели обработки данных</h3>
              <p>Собранные данные используются для:</p>
              <ul>
                <li>Ответа на запросы пользователей</li>
                <li>Улучшения качества обслуживания</li>
                <li>Статистического анализа посещаемости</li>
              </ul>

              <h3>4. Защита данных</h3>
              <p>Мы принимаем необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа.</p>

              <h3>5. Файлы cookie</h3>
              <p>Сайт использует cookie-файлы для обеспечения корректной работы и персонализации контента. Вы можете отключить использование cookies в настройках браузера.</p>

              <h3>6. Права пользователей</h3>
              <p>Вы имеете право запросить информацию о ваших персональных данных, их изменение или удаление, связавшись с нами по адресу info@tiski.by.</p>

              <h3>7. Контакты</h3>
              <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:<br/>
              Email: info@tiski.by<br/>
              Телефон: (017) 362-98-99</p>
            } @else {
              <h3>1. General Provisions</h3>
              <p>This privacy policy defines the procedure for processing personal data of users of the hiborg.by website, owned by "Territory of Tools" LLC.</p>

              <h3>2. What Data We Collect</h3>
              <p>When using the site, we may collect the following data:</p>
              <ul>
                <li>Name and contact details (when filling out the contact form)</li>
                <li>Email and phone number</li>
                <li>Technical information (IP address, browser type, cookies)</li>
              </ul>

              <h3>3. Purposes of Data Processing</h3>
              <p>Collected data is used for:</p>
              <ul>
                <li>Responding to user inquiries</li>
                <li>Improving service quality</li>
                <li>Statistical analysis of site visits</li>
              </ul>

              <h3>4. Data Protection</h3>
              <p>We take necessary technical and organizational measures to protect your personal data from unauthorized access.</p>

              <h3>5. Cookies</h3>
              <p>The site uses cookies to ensure proper operation and content personalization. You can disable cookies in your browser settings.</p>

              <h3>6. User Rights</h3>
              <p>You have the right to request information about your personal data, its modification or deletion by contacting us at info@tiski.by.</p>

              <h3>7. Contacts</h3>
              <p>For questions related to personal data processing, contact:<br/>
              Email: info@tiski.by<br/>
              Phone: (017) 362-98-99</p>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--bg-elevated);
      border-top: 1px solid var(--border-light);
      padding: 1rem;
      z-index: 1001;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .cookie-content {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 1.5rem;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
    }

    .cookie-icon {
      flex-shrink: 0;

      svg {
        width: 40px;
        height: 40px;
        color: var(--primary);
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .cookie-text {
      flex: 1;

      p {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
      }

      a {
        color: var(--primary);

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .cookie-actions {
      display: flex;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .btn-sm {
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1002;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      max-width: 700px;
      max-height: 80vh;
      overflow: hidden;
      position: relative;
      animation: scaleIn 0.3s ease-out;

      h2 {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border-light);
        margin: 0;
        color: var(--primary);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.5rem;
      transition: color var(--transition-fast);

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        color: var(--text-primary);
      }
    }

    .modal-body {
      padding: 2rem;
      overflow-y: auto;
      max-height: calc(80vh - 80px);

      h3 {
        color: var(--text-primary);
        font-size: 1rem;
        margin: 1.5rem 0 0.75rem;

        &:first-child {
          margin-top: 0;
        }
      }

      p {
        color: var(--text-secondary);
        font-size: 0.9375rem;
        line-height: 1.7;
        margin-bottom: 1rem;
      }

      ul {
        color: var(--text-secondary);
        font-size: 0.9375rem;
        line-height: 1.7;
        margin: 0 0 1rem 1.5rem;

        li {
          margin-bottom: 0.25rem;
        }
      }
    }
  `],
})
export class CookieConsentComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  readonly currentLang = this.translationService.currentLang;

  readonly showBanner = signal(false);
  readonly showPrivacyModal = signal(false);

  ngOnInit(): void {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => this.showBanner.set(true), BANNER_SHOW_DELAY_MS);
    }
  }

  accept(): void {
    localStorage.setItem('cookie-consent', 'accepted');
    this.showBanner.set(false);
  }

  decline(): void {
    localStorage.setItem('cookie-consent', 'declined');
    this.showBanner.set(false);
  }

  showPrivacy(event: Event): void {
    event.preventDefault();
    this.showPrivacyModal.set(true);
  }

  closePrivacy(): void {
    this.showPrivacyModal.set(false);
  }
}
