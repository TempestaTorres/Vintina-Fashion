import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';

@Component({
  selector: 'app-modal-bio',
  imports: [],
  templateUrl: './modal-bio.component.html',
  styleUrl: './modal-bio.component.css',
})

export class ModalBioComponent {
  @Input({ required: true }) opened!: boolean;
  @Input()
  bioImg!: string;
  @Input() bioName: string = '';
  @Input() bioHeight: string = '';
  @Input() bioBust: string = '';
  @Input() bioWaist: string = '';
  @Input() bioHips: string = '';
  @Input({transform: numberAttribute})
  bioDress: number = 0;
  @Output() bioClosed = new EventEmitter<void>();


  constructor() {
  }
  public close(): void {
    this.bioClosed.emit();
  }
}
