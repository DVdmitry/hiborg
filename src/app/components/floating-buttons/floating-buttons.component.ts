import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  template: `
    <div class="floating-container" [class.expanded]="isExpanded()">
      <button class="toggle-btn" (click)="toggle()" aria-label="Contact options">
        @if (isExpanded()) {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        }
      </button>

      <div class="buttons-list">
        <a
          href="https://wa.me/375447247736"
          target="_blank"
          rel="noopener"
          class="messenger-btn whatsapp"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span class="btn-label">WhatsApp</span>
        </a>

        <a
          href="tel:+375447247736"
          class="messenger-btn phone"
          aria-label="Call us"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span class="btn-label">Позвонить</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .floating-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 1rem;

      @media (max-width: 640px) {
        bottom: 1rem;
        right: 1rem;
      }
    }

    .toggle-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary);
      border: none;
      color: var(--bg-dark);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(55, 182, 255, 0.4);
      transition: all var(--transition-base);

      svg {
        width: 28px;
        height: 28px;
      }

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(55, 182, 255, 0.5);
      }

      @media (max-width: 640px) {
        width: 52px;
        height: 52px;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .buttons-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all var(--transition-base);
    }

    .floating-container.expanded .buttons-list {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .messenger-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-full);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all var(--transition-base);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

      svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }

      .btn-label {
        white-space: nowrap;
      }

      &:hover {
        transform: translateX(-5px);
      }

      @media (max-width: 640px) {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .whatsapp {
      background: #25D366;
      color: white;

      &:hover {
        background: #20BD5A;
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
      }
    }

    .phone {
      background: var(--bg-elevated);
      color: var(--primary);
      border: 1px solid var(--primary);

      &:hover {
        background: var(--primary);
        color: var(--bg-dark);
        box-shadow: 0 6px 20px rgba(55, 182, 255, 0.4);
      }
    }
  `],
})
export class FloatingButtonsComponent {
  readonly isExpanded = signal(false);

  toggle(): void {
    this.isExpanded.update(v => !v);
  }
}
