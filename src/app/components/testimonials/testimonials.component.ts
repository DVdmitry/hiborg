import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface Testimonial {
  nameRu: string;
  nameEn: string;
  roleRu: string;
  roleEn: string;
  textRu: string;
  textEn: string;
  rating: number;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  template: `
    <section id="testimonials" class="section testimonials">
      <div class="container">
        <div class="testimonials-header" appAnimateOnScroll animationType="fadeInUp">
          <h2 class="section-title">{{ currentLang() === 'ru' ? 'Отзывы клиентов' : 'Customer Reviews' }}</h2>
          <p class="testimonials-subtitle">{{ currentLang() === 'ru' ? 'Что говорят о нас наши клиенты' : 'What our customers say about us' }}</p>
        </div>

        <div class="testimonials-grid">
          @for (testimonial of testimonials; track testimonial.nameRu; let i = $index) {
            <div class="testimonial-card card" appAnimateOnScroll animationType="fadeInUp" [animationDelay]="i * 150">
              <div class="testimonial-header">
                <div class="avatar">{{ testimonial.avatar }}</div>
                <div class="author-info">
                  <h4 class="author-name">{{ currentLang() === 'ru' ? testimonial.nameRu : testimonial.nameEn }}</h4>
                  <span class="author-role">{{ currentLang() === 'ru' ? testimonial.roleRu : testimonial.roleEn }}</span>
                </div>
              </div>

              <div class="rating">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg
                    class="star"
                    [class.filled]="star <= testimonial.rating"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                }
              </div>

              <p class="testimonial-text">{{ currentLang() === 'ru' ? testimonial.textRu : testimonial.textEn }}</p>

              <div class="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 0 1rem;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }
    }

    .section-title {
      margin-bottom: 1rem;
    }

    .testimonials-subtitle {
      color: var(--text-secondary);
      font-size: 1.125rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    .testimonial-card {
      position: relative;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media (max-width: 640px) {
        padding: 1.5rem;
        gap: 1rem;
      }
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--bg-dark);
      font-weight: 700;
    }

    .author-info {
      display: flex;
      flex-direction: column;
    }

    .author-name {
      color: var(--text-primary);
      font-size: 1rem;
      margin: 0;
    }

    .author-role {
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .rating {
      display: flex;
      gap: 0.25rem;
    }

    .star {
      width: 20px;
      height: 20px;
      color: var(--border-light);

      &.filled {
        color: #FFD700;
      }
    }

    .testimonial-text {
      color: var(--text-secondary);
      font-size: 0.9375rem;
      line-height: 1.7;
      flex: 1;
    }

    .quote-icon {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      opacity: 0.1;

      svg {
        width: 40px;
        height: 40px;
        color: var(--primary);
      }
    }
  `],
})
export class TestimonialsComponent {
  private readonly translationService = inject(TranslationService);
  readonly currentLang = this.translationService.currentLang;

  testimonials: Testimonial[] = [
    {
      nameRu: 'Александр Петров',
      nameEn: 'Alexander Petrov',
      roleRu: 'Строитель, ИП',
      roleEn: 'Builder, Sole Proprietor',
      textRu: 'Пользуюсь инструментами HIBORG уже более года. Отличное качество за разумные деньги. Особенно порадовали свёрла по металлу — работают отлично, не тупятся долго.',
      textEn: 'Been using HIBORG tools for over a year. Excellent quality for reasonable price. Especially pleased with metal drill bits — work great, stay sharp for long.',
      rating: 5,
      avatar: 'АП',
    },
    {
      nameRu: 'Сергей Иванов',
      nameEn: 'Sergey Ivanov',
      roleRu: 'Мастер по ремонту',
      roleEn: 'Repair Specialist',
      textRu: 'Заказывал киянки и гвоздодёры для мастерской. Доставка быстрая, товар качественный. Рекомендую всем, кто ищет надёжный инструмент без переплат.',
      textEn: 'Ordered mallets and crowbars for my workshop. Fast delivery, quality products. Recommend to anyone looking for reliable tools without overpaying.',
      rating: 5,
      avatar: 'СИ',
    },
    {
      nameRu: 'Виктор Козлов',
      nameEn: 'Victor Kozlov',
      roleRu: 'Прораб, ООО "СтройМастер"',
      roleEn: 'Foreman, StroyMaster LLC',
      textRu: 'Закупаем инструменты HIBORG для бригады. Соотношение цена-качество отличное. Менеджеры всегда на связи, помогают с подбором. Будем продолжать сотрудничество.',
      textEn: 'We purchase HIBORG tools for our team. Price-quality ratio is excellent. Managers are always available, help with selection. Will continue cooperation.',
      rating: 5,
      avatar: 'ВК',
    },
    {
      nameRu: 'Дмитрий Новиков',
      nameEn: 'Dmitry Novikov',
      roleRu: 'Домашний мастер',
      roleEn: 'DIY Enthusiast',
      textRu: 'Купил набор для домашних работ. Всё аккуратно упаковано, инструменты удобные в руке. За полгода использования нареканий нет.',
      textEn: 'Bought a set for home repairs. Everything neatly packaged, tools comfortable to hold. No complaints after six months of use.',
      rating: 4,
      avatar: 'ДН',
    },
    {
      nameRu: 'Михаил Сидоров',
      nameEn: 'Mikhail Sidorov',
      roleRu: 'Электрик',
      roleEn: 'Electrician',
      textRu: 'Отличные ножи с выдвижным лезвием! Пользуюсь каждый день на работе. Механизм надёжный, лезвия острые. Беру уже третий раз.',
      textEn: 'Excellent utility knives! Use them every day at work. Mechanism is reliable, blades are sharp. Buying for the third time already.',
      rating: 5,
      avatar: 'МС',
    },
    {
      nameRu: 'Андрей Волков',
      nameEn: 'Andrey Volkov',
      roleRu: 'Владелец СТО',
      roleEn: 'Auto Shop Owner',
      textRu: 'Для нашего автосервиса закупили буры по бетону и пистолеты для герметика. Качество на высоте, цены адекватные. Менеджер Ольга помогла с оптовым заказом.',
      textEn: 'Purchased concrete drills and sealant guns for our auto shop. Quality is top-notch, prices are fair. Manager Olga helped with wholesale order.',
      rating: 5,
      avatar: 'АВ',
    },
  ];
}
