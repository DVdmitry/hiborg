import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductShowcaseComponent } from './components/product-showcase/product-showcase.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ProductsComponent } from './components/products/products.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { FaqComponent } from './components/faq/faq.component';
// import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingButtonsComponent } from './components/floating-buttons/floating-buttons.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ProductShowcaseComponent,
    AboutComponent,
    BenefitsComponent,
    ProductsComponent,
    WhyUsComponent,
    FaqComponent,
    PartnersComponent,
    ContactComponent,
    FooterComponent,
    FloatingButtonsComponent,
    CookieConsentComponent,
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-product-showcase />
      <app-about />
      <app-benefits />
      <app-products />
      <app-why-us />
      <app-faq />
      <!-- <app-testimonials /> -->
      <app-partners />
      <app-contact />
    </main>
    <app-footer />
    <app-floating-buttons />
    <app-cookie-consent />
  `,
  styles: [`
    :host {
      display: block;
    }

    main {
      min-height: 100vh;
    }
  `],
})
export class AppComponent {}
