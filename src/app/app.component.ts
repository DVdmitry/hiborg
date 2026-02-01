import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ProductsComponent } from './components/products/products.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    BenefitsComponent,
    ProductsComponent,
    WhyUsComponent,
    PartnersComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-benefits />
      <app-products />
      <app-why-us />
      <app-partners />
      <app-contact />
    </main>
    <app-footer />
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
