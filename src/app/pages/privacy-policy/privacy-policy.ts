import { Component } from '@angular/core';
import {AccordionService} from '../../services/accordion-service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  constructor(private accordionService: AccordionService) {
  }
  public toggle(e: MouseEvent, accordion: HTMLElement): void {

    this.accordionService.accordionToggle(e, accordion);
  }
}
