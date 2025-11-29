import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AccordionService} from '../../services/accordion-service';

@Component({
  selector: 'app-terms-conditions',
  imports: [
    RouterLink
  ],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.css',
})
export class TermsConditions {
  constructor(private accordionService: AccordionService) {
  }

  public toggle(e: MouseEvent, accordion: HTMLElement): void {

    this.accordionService.accordionToggle(e, accordion);
  }
}
