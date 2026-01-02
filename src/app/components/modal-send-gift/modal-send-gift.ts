import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';
import {Phones, PhoneType} from '../../phones/phones-types';
import {DatePicker} from '../date-picker/date-picker';
import {RouterLink} from '@angular/router';

export interface GiftInfo {
  To: string,
  From: string,
  Email: string,
  Phone: string,
  Message: string,
  DeliveryMethod: string,
  Month: string,
  Year: number,
  Day: number,
  Time: string,
}
@Component({
  selector: 'app-modal-send-gift',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    RouterLink
  ],
  templateUrl: './modal-send-gift.html',
  styleUrl: './modal-send-gift.css',
})
export class ModalSendGift {
  @Input()
  opened: boolean = false;
  @Output()
  closed: EventEmitter<any> = new EventEmitter();
  @Output()
  giftInfoSaved: EventEmitter<any> = new EventEmitter();

  public giftToLabelActive: boolean = false;
  public giftFromLabelActive: boolean = false;
  public giftEmailLabelActive: boolean = false;
  public giftPhoneLabelActive: boolean = false;
  public giftTextFieldLabelActive: boolean = false;
  public onDeliveryChecked: boolean = false;
  public onSendNowChecked: boolean = false;
  public onSendLaterChecked: boolean = false;

  public userPhone: string = '';
  public phoneCodeDetected: boolean = false;
  public phones: PhoneType[] = [];
  public currentPhoneFlag: string = '';

  public processing: boolean = false;
  public formInvalid: boolean = false;

  protected giftMessageInfo: GiftInfo = {
    To: '',
    From: '',
    Email: '',
    Phone: '',
    Message: '',
    DeliveryMethod: '',
    Month: '',
    Year: 0,
    Day: 0,
    Time: ''
  }

  public giftForm: FormGroup = new FormGroup({
    giftnote_to: new FormControl('', Validators.required),
    giftnote_from: new FormControl('', Validators.required),
    giftnote_email: new FormControl('', [Validators.required,Validators.email]),
    giftnote_phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    giftnote_phone_select: new FormControl(''),
    giftnote_textarea: new FormControl('', [Validators.required, Validators.maxLength(210)]),
    giftDeliveryMethod: new FormControl('on delivery'),
  });

  constructor() {
  }

  ngOnInit() {
    this.phones = Phones;
    this.currentPhoneFlag = this.phones[0].flag;
  }

  get giftnoteTo() { return this.giftForm.get('giftnote_to'); };
  get giftnoteFrom() { return this.giftForm.get('giftnote_from'); };
  get giftnoteEmail() { return this.giftForm.get('giftnote_email'); };
  get giftnotePhone() { return this.giftForm.get('giftnote_phone'); };
  get giftnoteTextarea() { return this.giftForm.get('giftnote_textarea'); };

  public onInputGiftnoteToChange(): void {
    this.giftToLabelActive = this.giftForm.value.giftnote_to.length > 0;
  }
  public onInputGiftnoteFromChange(): void {
    this.giftFromLabelActive = this.giftForm.value.giftnote_from.length > 0;
  }
  public onInputGiftnoteEmailChange(): void {
    this.giftEmailLabelActive = this.giftForm.value.giftnote_email.length > 0;
  }
  public onInputGiftTextareaChange(): void {
    this.giftTextFieldLabelActive = this.giftForm.value.giftnote_textarea.length > 0;
  }
  public onInputGiftPhoneChange(): void {
    this.giftPhoneLabelActive = this.giftForm.value.giftnote_phone.length > 0;

    if (this.giftForm.value.giftnote_phone.length > 0) {
      this.userPhone = this.giftForm.value.giftnote_phone;
      this.checkUserPhone();
    }
  }
  public onInputGiftPhoneSelectChange(): void {

    let code: string | null = this.getPhoneCode(this.giftForm.value.giftnote_phone_select);
    let flag: string | null = this.getPhoneFlag(this.giftForm.value.giftnote_phone_select);

    if (code !== null) {
      let value: string = code + " ";

      this.giftForm.patchValue({
        giftnote_phone: value,
      });
    }

    if (flag !== null) {
      this.currentPhoneFlag = flag;
    }
  }
  public optionOnDeliveryClick(): void {
    this.onDeliveryChecked = true;
    this.onSendNowChecked = false;
    this.onSendLaterChecked = false;
  }
  public optionOnSendNowClick(): void {
    this.onSendNowChecked = true;
    this.onDeliveryChecked = false;
    this.onSendLaterChecked = false;
  }
  public optionOnSendLaterClick(): void {
    this.onSendLaterChecked = true;
    this.onSendNowChecked = false;
    this.onDeliveryChecked = false;
  }

  public close(): void {
    this.closed.emit();
  }

  public giftDateSelected(event: any): void {
    this.giftMessageInfo.Day = event.day;
    this.giftMessageInfo.Month = event.month;
    this.giftMessageInfo.Year = event.year;
  }
  public giftDateTimeSelected(event: any): void {
    this.giftMessageInfo.Time = event;
  }
  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();

    if (this.giftForm.valid) {
      // Save all info
      this.formInvalid = false;
      this.processing = true;

      setTimeout(() => {

        this.processing = false;

        this.giftMessageInfo.To = this.giftForm.value.giftnote_to;
        this.giftMessageInfo.From = this.giftForm.value.giftnote_from;
        this.giftMessageInfo.Email = this.giftForm.value.giftnote_email;
        this.giftMessageInfo.Phone = this.giftForm.value.giftnote_phone;
        this.giftMessageInfo.DeliveryMethod = this.giftForm.value.giftDeliveryMethod;
        this.giftMessageInfo.Message = this.giftForm.value.giftnote_textarea;

        this.giftInfoSaved.emit(this.giftMessageInfo);

      }, 3000);
    }
    else {
      this.formInvalid = true;
    }
  }

  private getPhoneCode(id: string): string | null {

    for (let i = 0; i < this.phones.length; i++) {
      if (id === this.phones[i].id) {
        return this.phones[i].code;
      }
    }
    return null;
  }

  private getPhoneFlag(id: string): string | null {

    for (let i = 0; i < this.phones.length; i++) {
      if (id === this.phones[i].id) {
        return this.phones[i].flag;
      }
    }
    return null;
  }

  private checkUserPhone(): void {
    this.phoneCodeDetected = false;

    for (let i:number = 0; i < this.phones.length; i++) {
      if (this.userPhone.includes(this.phones[i].code)) {
        this.currentPhoneFlag = this.phones[i].flag;
        this.phoneCodeDetected = true;
        this.giftForm.patchValue({
          giftnote_phone_select: this.phones[i].id,
        });
        break;
      }
    }
  }
}
