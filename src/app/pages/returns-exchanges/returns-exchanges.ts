import { Component } from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';

@Component({
  selector: 'app-returns-exchanges',
  imports: [
    ObserveElementDirective
  ],
  templateUrl: './returns-exchanges.html',
  styleUrl: './returns-exchanges.css',
})
export class ReturnsExchanges {

}
