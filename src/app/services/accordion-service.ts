import { Injectable } from '@angular/core';
declare var jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class AccordionService {

  public accordionToggle(e: MouseEvent, accordion: HTMLElement): void {
    e.preventDefault();

    let target: HTMLElement = e.currentTarget as HTMLElement;

    const r = jQuery(target).parent();

    if (r.hasClass("expand")) {
      r.find(".card-expand").slideUp();
      r.removeClass("expand");
    }
    else {
      jQuery(accordion).find('.card-expand').slideUp();
      jQuery(accordion).find('.card-wrapper').removeClass("expand");
      r.addClass("expand");
      r.find(".card-expand").slideDown();
    }
  }
}
