import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header.component/header.component';
import {FooterComponent} from './components/footer.component/footer.component';
import {ModalComponent} from './components/modal.component/modal.component';
import {CookieConsent} from './components/cookie-consent/cookie-consent';
import {MiniCartComponent} from './components/mini-cart.component/mini-cart.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent, CookieConsent, MiniCartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  public routeValid: boolean = true;

  constructor(private router: Router) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {

        this.routeValid = !(event.url === '/**' || event.url === '/login' || event.url === '/signup');

      });
  }

  ngOnInit() {

  }
}
