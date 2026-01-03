import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header.component/header.component';
import {FooterComponent} from './components/footer.component/footer.component';
import {ModalComponent} from './components/modal.component/modal.component';
import {CookieConsent} from './components/cookie-consent/cookie-consent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent, CookieConsent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor() { }
  ngOnInit() {

  }
}
