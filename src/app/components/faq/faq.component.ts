import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface FaqItem {
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  template: `
    <section id="faq" class="section faq">
      <div class="container">
        <div class="faq-header" appAnimateOnScroll animationType="fadeInUp">
          <h2 class="section-title">{{ currentLang() === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions' }}</h2>
          <p class="faq-subtitle">{{ currentLang() === 'ru' ? 'Ответы на популярные вопросы о нашей продукции' : 'Answers to common questions about our products' }}</p>
        </div>

        <div class="faq-list">
          @for (item of faqItems; track item.questionRu; let i = $index) {
            <div
              class="faq-item"
              [class.active]="activeIndex() === i"
              appAnimateOnScroll
              animationType="fadeInUp"
              [animationDelay]="i * 100"
            >
              <button class="faq-question" (click)="toggle(i)">
                <span>{{ currentLang() === 'ru' ? item.questionRu : item.questionEn }}</span>
                <svg
                  class="faq-icon"
                  [class.rotated]="activeIndex() === i"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="faq-answer" [class.open]="activeIndex() === i">
                <p>{{ currentLang() === 'ru' ? item.answerRu : item.answerEn }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq {
      background: var(--bg-card);
    }

    .faq-header {
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

    .faq-subtitle {
      color: var(--text-secondary);
      font-size: 1.125rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0 1rem;
    }

    .faq-item {
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: all var(--transition-base);

      &:hover {
        border-color: var(--primary);
      }

      &.active {
        border-color: var(--primary);
        box-shadow: 0 0 20px rgba(55, 182, 255, 0.1);
      }
    }

    .faq-question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.5rem;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 1.125rem;

      @media (max-width: 768px) {
        padding: 1.25rem;
        font-size: 1rem;
        gap: 0.75rem;
      }
      font-weight: 600;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--primary);
      }

      span {
        flex: 1;
      }
    }

    .faq-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: var(--primary);
      transition: transform var(--transition-base);

      &.rotated {
        transform: rotate(180deg);
      }
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--transition-base), padding var(--transition-base);

      &.open {
        max-height: 500px;
      }

      p {
        padding: 0 1.5rem 1.5rem;
        color: var(--text-secondary);
        line-height: 1.8;
      }
    }
  `],
})
export class FaqComponent {
  private readonly translationService = inject(TranslationService);
  readonly currentLang = this.translationService.currentLang;

  readonly activeIndex = signal<number | null>(null);

  readonly faqItems: FaqItem[] = [
    {
      questionRu: 'Какая гарантия на инструменты HIBORG?',
      questionEn: 'What warranty does HIBORG offer on tools?',
      answerRu: 'На всю продукцию HIBORG предоставляется официальная гарантия производителя. Срок гарантии зависит от категории товара и составляет от 6 месяцев до 2 лет. Гарантийное обслуживание осуществляется через официальный сервисный центр.',
      answerEn: 'All HIBORG products come with official manufacturer warranty. Warranty period depends on product category and ranges from 6 months to 2 years. Warranty service is provided through our official service center.',
    },
    {
      questionRu: 'Как осуществляется доставка по Беларуси?',
      questionEn: 'How does delivery work across Belarus?',
      answerRu: 'Мы осуществляем доставку по всей территории Беларуси. Доставка в Минск — 1-2 рабочих дня, в регионы — 2-5 рабочих дней. Возможен самовывоз со склада в Минске. При заказе от определённой суммы доставка бесплатная.',
      answerEn: 'We deliver across all of Belarus. Delivery to Minsk takes 1-2 business days, to regions — 2-5 business days. Self-pickup from our Minsk warehouse is available. Free delivery is offered for orders above a certain amount.',
    },
    {
      questionRu: 'Можно ли вернуть товар?',
      questionEn: 'Can I return a product?',
      answerRu: 'Да, вы можете вернуть товар надлежащего качества в течение 14 дней с момента покупки при сохранении товарного вида и упаковки. Товар ненадлежащего качества подлежит замене или возврату в соответствии с законодательством РБ.',
      answerEn: 'Yes, you can return products of proper quality within 14 days of purchase if the product appearance and packaging are preserved. Defective products are subject to replacement or refund according to Belarus legislation.',
    },
    {
      questionRu: 'Где производятся инструменты HIBORG?',
      questionEn: 'Where are HIBORG tools manufactured?',
      answerRu: 'Инструменты HIBORG производятся на сертифицированных заводах в Азии под строгим контролем качества нашей компании. Каждая партия проходит проверку перед отправкой в Беларусь. Мы гарантируем соответствие всей продукции заявленным характеристикам.',
      answerEn: 'HIBORG tools are manufactured at certified factories in Asia under strict quality control of our company. Each batch undergoes inspection before shipping to Belarus. We guarantee that all products meet declared specifications.',
    },
    {
      questionRu: 'Есть ли у вас оптовые цены?',
      questionEn: 'Do you offer wholesale prices?',
      answerRu: 'Да, мы предлагаем специальные условия для оптовых покупателей и корпоративных клиентов. Свяжитесь с нашим отделом продаж для получения индивидуального коммерческого предложения.',
      answerEn: 'Yes, we offer special conditions for wholesale buyers and corporate clients. Contact our sales department to receive a personalized commercial offer.',
    },
    {
      questionRu: 'Как получить консультацию по подбору инструмента?',
      questionEn: 'How can I get help choosing the right tool?',
      answerRu: 'Наши специалисты готовы помочь вам с подбором инструмента. Позвоните нам по телефону, напишите в мессенджер или заполните форму обратной связи на сайте. Мы подберём оптимальное решение под ваши задачи и бюджет.',
      answerEn: 'Our specialists are ready to help you choose the right tool. Call us, send a message, or fill out the contact form on the website. We will find the optimal solution for your tasks and budget.',
    },
  ];

  toggle(index: number): void {
    this.activeIndex.update(current => current === index ? null : index);
  }
}
