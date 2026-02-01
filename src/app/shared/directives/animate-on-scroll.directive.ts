import { Directive, ElementRef, OnInit, OnDestroy, inject, input } from '@angular/core';

type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  readonly animationType = input<AnimationType>('fadeInUp');
  readonly animationDelay = input(0);
  readonly animationThreshold = input(0.1);

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;

    // Set initial hidden state
    element.style.opacity = '0';
    element.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
    element.style.transitionDelay = `${this.animationDelay()}ms`;

    // Set initial transform based on animation type
    switch (this.animationType()) {
      case 'fadeInUp':
        element.style.transform = 'translateY(40px)';
        break;
      case 'fadeInLeft':
        element.style.transform = 'translateX(-40px)';
        break;
      case 'fadeInRight':
        element.style.transform = 'translateX(40px)';
        break;
      case 'scaleIn':
        element.style.transform = 'scale(0.9)';
        break;
      default:
        element.style.transform = 'none';
    }

    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            // Unobserve after animation
            this.observer?.unobserve(element);
          }
        });
      },
      {
        threshold: this.animationThreshold(),
        rootMargin: '0px 0px -50px 0px',
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
