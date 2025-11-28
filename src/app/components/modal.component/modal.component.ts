import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DateService} from '../../services/date-service';

@Component({
  selector: 'ng-app-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {

  public dialogName: string = 'Sign Up via Text for Offers — Vintina';
  public bOpen: boolean = false;
  public closed: boolean = false;
  public shutdown: boolean = false;
  public confirmed: boolean = false;
  public bFriday: boolean = false;

  // Form group
  public offerFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthday: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
  });

  constructor( private dateService: DateService ) {
  }

  ngOnInit() {

    this.isFriday();

    window.addEventListener('mousemove', (evt: MouseEvent) => {

      if (evt.clientY < 20 && !this.closed) {
        this.bOpen = true;
        this.closed = true;
      }

    })
  }
  public onOk(e: SubmitEvent): void {
    e.preventDefault();

    if (!this.confirmed) {
      this.confirmed = true;
    }
    else if(this.confirmed) {

      if (this.offerFormGroup.valid) {


        console.log(this.offerFormGroup.value);
        this.offerFormGroup.reset();
        this.bOpen = false;
      }

    }
  }
  public onCancel(): void {

    this.shutdown = true;

    setTimeout(() => {
      this.bOpen = false;
    }, 1000);
  }

  public onOpen(): void {
    this.bOpen = true;
  }

  public isFriday(): void {
    let dayOfWeek: string = this.dateService.getDayOfWeekName();
    this.bFriday = dayOfWeek === 'Friday';
  }
}
