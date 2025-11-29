import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {About} from './pages/about/about';
import {Product} from './components/product/product';
import {Category} from './components/category/category';
import {ShopComponent} from './components/shop.component/shop.component';
import {CartComponent} from './components/cart.component/cart.component';
import {BridalShapewear} from './posts/bridal-shapewear/bridal-shapewear';
import {TermsConditions} from './pages/terms-conditions/terms-conditions';
import {PrivacyPolicy} from './pages/privacy-policy/privacy-policy';
import {ReturnsExchanges} from './pages/returns-exchanges/returns-exchanges';
import {Contact} from './pages/contact/contact';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'about', component: About},
  {path: 'shop', component: ShopComponent},
  {path: 'product/:type', component: Product},
  {path: 'product-category/:name', component: Category},
  {path: 'product-tag/:tag', component: Category},
  {path: 'cart', component: CartComponent},
  {path: 'bridal-shapewear', component: BridalShapewear},
  {path: 'terms-conditions', component: TermsConditions},
  {path: 'privacy-policy', component: PrivacyPolicy},
  {path: 'returns-exchanges', component: ReturnsExchanges},
  {path: 'contact', component: Contact},
];
