import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ScrollTotopService} from '../../services/scrolltotop-service';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  public activeAccordionItem: boolean[] = [false, false];

  public responseMessage: string = '';
  public successMessage: string = 'Thank you for contacting!';
  public errorMessage: string = 'Check your credentials!';
  public responseMessageActive: boolean = false;
  public response: boolean = false;

  public labelNameActive: boolean = false;
  public labelEmailActive: boolean = false;
  public labelSubjectActive: boolean = false;
  public labelPhoneActive: boolean = false;
  public labelMessageActive: boolean = false;

  public processingMessage: boolean = false;

  public metForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    subject: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    message: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  constructor(private scrollTotopService: ScrollTotopService) {
  }

  ngOnInit() {
    this.scrollTotopService.toTop();
  }

  get name() {return this.metForm.get('name');};
  get email() {return this.metForm.get('email');};
  get subject() {return this.metForm.get('subject');};
  get phone() {return this.metForm.get('phone');};
  get message() {return this.metForm.get('message');};

  public accordionItemClicked(index: number) {
    this.activeAccordionItem[index] = !this.activeAccordionItem[index];
  }

  public onInputNameChange(): void {
    this.labelNameActive = this.metForm.value.name.length > 0;
  }

  public onInputEmailChange(): void {
    this.labelEmailActive = this.metForm.value.email.length > 0;
  }

  public onInputSubjectChange(): void {
    this.labelSubjectActive = this.metForm.value.subject.length > 0;
  }

  public onInputPhoneChange(): void {
    this.labelPhoneActive = this.metForm.value.phone.length > 0;
  }
  public onInputMessageChange(): void {
    this.labelMessageActive = this.metForm.value.message.length > 0;
  }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();

    this.response = this.metForm.status === 'VALID';

    if (this.metForm.status === 'VALID') {
      this.processingMessage = true;

      setTimeout(() => {
        this.metForm.reset();
        this.resetLabels();
        this.processingMessage = false;
        this.showResponseMessage(this.successMessage);
      }, 1000);
    }
    else {
      this.showResponseMessage(this.errorMessage);
    }

  }

  private showResponseMessage(message: string): void {
    this.responseMessage = message;

    this.responseMessageActive = true;

    setTimeout(() => {
      this.responseMessageActive = false;
    }, 3000);
  }

  private resetLabels(): void {
    this.labelNameActive = false;
    this.labelEmailActive = false;
    this.labelSubjectActive = false;
    this.labelPhoneActive = false;
    this.labelMessageActive = false;
  }
}
