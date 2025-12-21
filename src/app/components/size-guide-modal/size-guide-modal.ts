import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-size-guide-modal',
  imports: [],
  templateUrl: './size-guide-modal.html',
  styleUrl: './size-guide-modal.css',
})
export class SizeGuideModal {
  @Input({ required: true }) opened: boolean = false;
  @Output() sizeGuidClosed = new EventEmitter<void>();

  public currentLinePosition: string = 'width: 84.55000305175781px; transform: none;'
  public activeTabs: boolean[] = [true, false, false];
  public activeAccordionItem: boolean[] = [false, false, false];

  public close(): void {
    this.sizeGuidClosed.emit();
  }

  public accordionItemClicked(index: number): void {

    /*
    for (let i: number = 0; i < this.activeAccordionItem.length; i++) {

      if (i !== index) {
        this.activeAccordionItem[i] = false;
      }
    }
     */
    this.activeAccordionItem[index] = !this.activeAccordionItem[index];
  }

  public tabClicked(index: number, e: MouseEvent): void {
    e.preventDefault();

    this.activeTabs[0] = false;
    this.activeTabs[1] = false;
    this.activeTabs[2] = false;
    this.activeTabs[index] = true;

    let target = e.currentTarget as HTMLElement;
    let rc: DOMRect = target.getBoundingClientRect();

    switch (index) {
      case 0:
        this.currentLinePosition = `width: ${rc.width}px; transform: none;`;
        break;
      case 1:
        this.currentLinePosition = `width: ${rc.width}px; transform: translateX(${rc.width * index - 26}px);`;
        break;
      case 2:
        this.currentLinePosition = `width: ${rc.width}px; transform: translateX(${rc.width * index}px);`;
        break;
    }
  }
}
