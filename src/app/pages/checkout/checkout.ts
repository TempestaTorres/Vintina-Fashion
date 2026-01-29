import {Component, ElementRef, ViewChild} from '@angular/core';
import {AddToCart} from '../../services/add-to-cart';
import {ProductType} from '../../product/product-type';
import {ScrollTotopService} from '../../services/scrolltotop-service';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';
import {Phones, PhoneType} from '../../phones/phones-types';
import {ModalTextPrompt} from '../../components/modal-text-prompt/modal-text-prompt';
import {GiftInfo, ModalSendGift} from '../../components/modal-send-gift/modal-send-gift';
import {CurrencyPipe} from '@angular/common';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ModalTextPrompt,
    ModalSendGift,
    CurrencyPipe
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  @ViewChild('shipping_country_select')
  shippingCountrySelect!: ElementRef;
  @ViewChild('select_billing_country')
  billingCountrySelect!: ElementRef;

  public cartItems: ProductType[] = [];
  public accessoryItems: ProductType[] = [];
  public unavailableItems: ProductType[] = [];
  public labelActive: boolean = false;
  public labelFirstNameActive: boolean = false;
  public labelBillingFirstNameActive: boolean = false;
  public labelLastNameActive: boolean = false;
  public labelBillingLastNameActive: boolean = false;
  public labelCompanyActive: boolean = false;
  public labelBillingCompanyActive: boolean = false;
  public labelShippingAddressActive: boolean = false;
  public labelBillingAddressActive: boolean = false;
  public labelApartmentActive: boolean = false;
  public labelBillingApartmentActive: boolean = false;
  public labelCityActive: boolean = false;
  public labelBillingCityActive: boolean = false;
  public labelZipcodeActive: boolean = false;
  public labelBillingZipcodeActive: boolean = false;
  public labelPostalcodeActive: boolean = false;
  public labelBillingPostalcodeActive: boolean = false;
  public labelPhoneActive: boolean = false;
  public labelBillingPhoneActive: boolean = false;
  public labelSmsActive: boolean = false;
  public labelSmsRememberMeActive: boolean = false;
  public labelCardNumberActive: boolean = false;
  public labelExpirationDateActive: boolean = false;
  public labelCvvActive: boolean = false;
  public labelCardNameActive: boolean = false;
  public shipToAddressChecked: boolean = true;
  public shipToPickupPointChecked: boolean = false;
  public currentCountry: string = 'US';
  public currentBillingCountry: string = 'US';
  public countryName: string = '';

  public phones: PhoneType[] = Phones;
  public currentPhoneFlag: string = this.phones[0].flag;
  public currentBillingPhoneFlag: string = this.phones[0].flag;
  public userPhone: string = '';
  public userBillingPhone: string = '';
  public userRememberMePhone: string = '';
  public phoneCodeDetected: boolean = false;
  public phoneBillingCodeDetected: boolean = false;
  public sendSmsMessage: boolean = false;
  public useShippingAddressAsBillingAddress: boolean = true;
  public rememberMeChecked: boolean = false;
  public checkBoxDeprecatedChecked: boolean = false;
  public processing: boolean = false;
  public addAccessoryProcessing: boolean[] = [];
  public locationAllowed: boolean = true;
  public shippingNotAvailable: boolean = false;

  public basicCardChecked: boolean = true;
  public shopPayChecked: boolean = false;
  public payPalChecked: boolean = false;

  public prompting: boolean = false;
  public promptType: string = '';
  public sendGift: boolean = false;
  public giftMeesageReceived: boolean = false;
  public dropdownExpanded: boolean = false;

  public removePopup: boolean = false;
  public scroll: boolean = false;

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

  public hiddenDropdownProductListExpanded: boolean = false;
  public dropdownOrderSummaryExpanded: boolean = false;
  public discountLabelActive: boolean = false;
  public apply: boolean = true;
  public totalAmount: number = 0;

  public formDiscountGroup: FormGroup = new FormGroup({
    reductionsInput: new FormControl(''),
  });

  public formCheckoutGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    checkBox: new FormControl(true),
    delivery_strategies: new FormControl('delivery-to-address'),
    country_select: new FormControl('US'),
    billing_country_select: new FormControl('US'),
    first_name: new FormControl('', [Validators.required]),
    billing_first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    billing_last_name: new FormControl('', [Validators.required]),
    company: new FormControl(''),
    billing_company: new FormControl(''),
    shipping_address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    billing_address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    apartment: new FormControl(''),
    billing_apartment: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    billing_city: new FormControl('', [Validators.required]),
    state_select: new FormControl(''),
    billing_state_select: new FormControl(''),
    zip_code: new FormControl('', [Validators.required]),
    billing_zip_code: new FormControl('', [Validators.required]),
    postal_code: new FormControl(''),
    billing_postal_code: new FormControl(''),
    phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    billing_phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    phoneSms: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    phoneSmsRememberMe: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
    phone_country_select: new FormControl(''),
    billing_phone_country_select: new FormControl(''),
    phoneSms_country_select: new FormControl(''),
    phoneSmsRememberMe_country_select: new FormControl(''),
    checkBoxTextMe: new FormControl(false),
    paymentMethod: new FormControl('Basic card'),
    credit_card_number: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9]*$')]),
    expiry: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    card_name: new FormControl('', [Validators.required]),
    checkBoxUseBillingAddress: new FormControl(true),
    checkBoxRememberMe: new FormControl(false),
    checkBoxDeprecated: new FormControl(false),
  });

  constructor(private  cartService: AddToCart, private scrollTotopService: ScrollTotopService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.scrollTotopService.toTop();
    this.cartItems = this.cartService.getCart();
    this.totalAmount = this.cartService.getCartSubTotalAmount();
    this.apply = true;

    this.accessoryItems = this.productService.getAccessories();
    this.addAccessoryProcessing = [];

    for (let i = 0; i < this.accessoryItems.length; i++) {
      this.addAccessoryProcessing[i] = false;
    }

    console.log(this.cartItems);
  }

  get email() { return this.formCheckoutGroup.get('email'); }
  get firstName() { return this.formCheckoutGroup.get('first_name'); }
  get billingFirstName() { return this.formCheckoutGroup.get('billing_first_name'); }
  get lastName() { return this.formCheckoutGroup.get('last_name'); }
  get billingLastName() { return this.formCheckoutGroup.get('billing_last_name'); }
  get shippingAddress() { return this.formCheckoutGroup.get('shipping_address'); }
  get billingAddress() { return this.formCheckoutGroup.get('billing_address'); }
  get city() { return this.formCheckoutGroup.get('city'); }
  get billingCity() { return this.formCheckoutGroup.get('billing_city'); }
  get zipcode() { return this.formCheckoutGroup.get('zip_code'); }
  get billingZipcode() { return this.formCheckoutGroup.get('billing_zip_code'); }
  get phone() { return this.formCheckoutGroup.get('phone'); }
  get billingPhone() { return this.formCheckoutGroup.get('billing_phone'); }
  get phoneSms() { return this.formCheckoutGroup.get('phoneSms'); }
  get phoneSmsRememberMe() { return this.formCheckoutGroup.get('phoneSmsRememberMe'); }
  get creditCardNumber() { return this.formCheckoutGroup.get('credit_card_number'); }
  get expirationDate() { return this.formCheckoutGroup.get('expiry'); }
  get cvv() { return this.formCheckoutGroup.get('cvv'); }
  get cardName() { return this.formCheckoutGroup.get('card_name'); }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();
  }
  public onDiscountSubmit(e: SubmitEvent): void {
    e.preventDefault();

    this.totalAmount = (this.totalAmount / 100) * 30;
  }

  public addAccessoryToCart(id: number, index: number): void {
    this.addAccessoryProcessing[index] = true;
    this.accessoryItems[index].quantity = 1;

    if (this.accessoryItems[index].available !== undefined && !this.accessoryItems[index].available) {
      this.unavailableItems.push(this.accessoryItems[index]);
    }

    setTimeout(() => {

      this.cartService.addToCart(this.accessoryItems[index]);
      this.totalAmount = this.cartService.getCartSubTotalAmount();
      this.addAccessoryProcessing[index] = false;

      this.accessoryItems = this.accessoryItems.filter(item => item.id !== id);
      this.addAccessoryProcessing = [];

      for (let i = 0; i < this.accessoryItems.length; i++) {
        this.addAccessoryProcessing[i] = false;
      }
    }, 1000);
  }

  public removeAccessoryFromCart(): void {
    for (let i: number = 0; i < this.cartItems.length; i++) {

      if (this.cartItems[i].available !== undefined && !this.cartItems[i].available) {

        this.unavailableItems = this.unavailableItems.filter(item => item.id !== this.cartItems[i].id);
        this.cartService.removeFromCart(this.cartItems[i]);
      }
    }
    this.cartItems = this.cartService.getCart();
    this.shippingNotAvailable = false;
  }
  public setSubTotalAmount(): number {
    return this.cartService.getCartSubTotalAmount();
  }

  public onHiddenDropdownProductListClick(): void {
    this.hiddenDropdownProductListExpanded = !this.hiddenDropdownProductListExpanded;
  }

  public onHiddenDropdownOrderSummaryClick(): void {
    this.dropdownOrderSummaryExpanded = !this.dropdownOrderSummaryExpanded;
  }

  public onInputChange(): void {
    this.labelActive = this.formCheckoutGroup.value.email.length > 0;
  }
  public onInputCountryChange(): void {
    this.currentCountry = this.formCheckoutGroup.value.country_select;

    this.shippingNotAvailable = this.currentCountry !== 'US' && this.unavailableItems.length > 0;
    this.countryName = this.getShippingCountryName(this.currentCountry);
  }
  public getShippingCountryName(value: string): string {
    let shippingCountryName = '';
    for (let i: number = 0; i < this.shippingCountrySelect.nativeElement.children.length; i++) {
      if (this.shippingCountrySelect.nativeElement.children[i].value === value) {
        shippingCountryName = this.shippingCountrySelect.nativeElement.children[i].innerText;
        break;
      }
    }
    return shippingCountryName;
  }
  public getBillingCountryName(value: string): string {
    let billingCountryName = '';
    for (let i: number = 0; i < this.billingCountrySelect.nativeElement.children.length; i++) {
      if (this.billingCountrySelect.nativeElement.children[i].value === value) {
        billingCountryName = this.billingCountrySelect.nativeElement.children[i].innerText;
        break;
      }
    }
    return billingCountryName;
  }
  public onInputBillingCountryChange(): void {
    this.currentBillingCountry = this.formCheckoutGroup.value.billing_country_select;
    this.shippingNotAvailable = this.currentBillingCountry !== 'US' && this.unavailableItems.length > 0;

    this.countryName = this.getBillingCountryName(this.currentBillingCountry);
  }

  public onInputFirstNameChange(): void {
    this.labelFirstNameActive = this.formCheckoutGroup.value.first_name.length > 0;
  }
  public onInputBillingFirstNameChange(): void {
    this.labelBillingFirstNameActive = this.formCheckoutGroup.value.billing_first_name.length > 0;
  }
  public onInputLastNameChange(): void {
    this.labelLastNameActive = this.formCheckoutGroup.value.last_name.length > 0;
  }
  public onInputBillingLastNameChange(): void {
    this.labelBillingLastNameActive = this.formCheckoutGroup.value.billing_last_name.length > 0;
  }
  public onInputCompanyChange(): void {
    this.labelCompanyActive = this.formCheckoutGroup.value.company.length > 0;
  }
  public onInputBillingCompanyChange(): void {
    this.labelBillingCompanyActive = this.formCheckoutGroup.value.billing_company.length > 0;
  }
  public onInputShippingAddressChange(): void {
    this.labelShippingAddressActive = this.formCheckoutGroup.value.shipping_address.length > 0;
  }
  public onInputBillingAddressChange(): void {
    this.labelBillingAddressActive = this.formCheckoutGroup.value.billing_address.length > 0;
  }
  public onInputShippingApartmentChange(): void {
    this.labelApartmentActive = this.formCheckoutGroup.value.apartment.length > 0;
  }
  public onInputBillingApartmentChange(): void {
    this.labelBillingApartmentActive = this.formCheckoutGroup.value.billing_apartment.length > 0;
  }
  public onInputShippingCityChange(): void {
    this.labelCityActive = this.formCheckoutGroup.value.city.length > 0;
  }
  public onInputBillingCityChange(): void {
    this.labelBillingCityActive = this.formCheckoutGroup.value.billing_city.length > 0;
  }
  public onInputZipcodeChange(): void {
    this.labelZipcodeActive = this.formCheckoutGroup.value.zip_code.length > 0;
  }
  public onInputBillingZipcodeChange(): void {
    this.labelBillingZipcodeActive = this.formCheckoutGroup.value.billing_zip_code.length > 0;
  }
  public onInputPostalodeChange(): void {
    this.labelPostalcodeActive = this.formCheckoutGroup.value.postal_code.length > 0;
  }
  public onInputBillingPostalodeChange(): void {
    this.labelBillingPostalcodeActive = this.formCheckoutGroup.value.billing_postal_code.length > 0;
  }
  public onInputPhoneChange(): void {
    this.labelPhoneActive = this.formCheckoutGroup.value.phone.length > 0;

    if (this.formCheckoutGroup.value.phone.length > 0) {
      this.userPhone = this.formCheckoutGroup.value.phone;
      this.checkUserPhone();
      this.formCheckoutGroup.patchValue({
        phoneSms: this.userPhone
      });
      this.labelSmsActive = true;
    }
  }

  public onInputBillingPhoneChange(): void {
    this.labelBillingPhoneActive = this.formCheckoutGroup.value.billing_phone.length > 0;

    if (this.formCheckoutGroup.value.billing_phone.length > 0) {
      this.userBillingPhone = this.formCheckoutGroup.value.billing_phone;
      this.checkBillingUserPhone();
    }
  }

  public onInputRememberMePhoneChange(): void {
    this.labelSmsRememberMeActive = this.formCheckoutGroup.value.phoneSmsRememberMe.length > 0;

    if (this.formCheckoutGroup.value.phoneSmsRememberMe.length > 0) {
      this.userRememberMePhone = this.formCheckoutGroup.value.phoneSmsRememberMe;
      this.checkRememberMeUserPhone();
    }
  }

  public onInputMobilePhoneChange(): void {
    this.labelSmsActive = this.formCheckoutGroup.value.phoneSms.length > 0;

    if (this.formCheckoutGroup.value.phoneSms.length > 0) {
      this.userPhone = this.formCheckoutGroup.value.phoneSms;
      this.checkUserPhone();
      this.formCheckoutGroup.patchValue({
        phone: this.userPhone,
        phoneSmsRememberMe: this.userPhone
      });
    }
  }
  public onInputCreditCardNumberChange(): void {
    this.labelCardNumberActive = this.formCheckoutGroup.value.credit_card_number.length > 0;
  }
  public onInputExpireChange(): void {
    this.labelExpirationDateActive = this.formCheckoutGroup.value.expiry.length > 0;
  }
  public onInputCvvChange(): void {
    this.labelCvvActive = this.formCheckoutGroup.value.cvv.length > 0;
  }
  public onInputCardNameChange(): void {
    this.labelCardNameActive = this.formCheckoutGroup.value.card_name.length > 0;
  }

  public onInputDiscountChange(): void {
    this.discountLabelActive = this.formDiscountGroup.value.reductionsInput.length > 0;
    this.apply = this.formDiscountGroup.value.reductionsInput !== 'vintina';
  }
  private checkUserPhone(): void {
    this.phoneCodeDetected = false;

    for (let i:number = 0; i < this.phones.length; i++) {
      if (this.userPhone.includes(this.phones[i].code)) {
        this.currentPhoneFlag = this.phones[i].flag;
        this.phoneCodeDetected = true;
        this.formCheckoutGroup.patchValue({
          phone_country_select: this.phones[i].id,
          phoneSms_country_select: this.phones[i].id
        });
        break;
      }
    }
  }

  private checkBillingUserPhone(): void {
    this.phoneBillingCodeDetected = false;

    for (let i:number = 0; i < this.phones.length; i++) {
      if (this.userBillingPhone.includes(this.phones[i].code)) {
        this.currentBillingPhoneFlag = this.phones[i].flag;
        this.phoneBillingCodeDetected = true;
        this.formCheckoutGroup.patchValue({
          billing_phone_country_select: this.phones[i].id,
        });
        break;
      }
    }
  }

  private checkRememberMeUserPhone(): void {
    this.phoneCodeDetected = false;

    for (let i:number = 0; i < this.phones.length; i++) {
      if (this.userRememberMePhone.includes(this.phones[i].code)) {
        this.currentPhoneFlag = this.phones[i].flag;
        this.phoneCodeDetected = true;
        this.formCheckoutGroup.patchValue({
          billing_phone_country_select: this.phones[i].id,
          phone_country_select: this.phones[i].id,
        });
        break;
      }
    }
  }
  public onInputPhoneCountryChange(): void {

    let code: string | null = this.getPhoneCode(this.formCheckoutGroup.value.phone_country_select);
    let flag: string | null = this.getPhoneFlag(this.formCheckoutGroup.value.phone_country_select);

    if (code !== null) {
      let value: string = code + " ";

      this.formCheckoutGroup.patchValue({
        phone: value,
        phoneSms: value,
        phoneSmsRememberMe: value
      });
    }

    if (flag !== null) {
      this.currentPhoneFlag = flag;
    }
  }
  public onInputPhoneRememberMeCountryChange(): void {

    let code: string | null = this.getPhoneCode(this.formCheckoutGroup.value.phoneSmsRememberMe_country_select);
    let flag: string | null = this.getPhoneFlag(this.formCheckoutGroup.value.phoneSmsRememberMe_country_select);

    if (code !== null) {
      let value: string = code + " ";

      this.formCheckoutGroup.patchValue({
        phone: value,
        phoneSms: value,
        phoneSmsRememberMe: value
      });
    }

    if (flag !== null) {
      this.currentPhoneFlag = flag;
    }
  }
  public onInputBillingPhoneCountryChange(): void {

    let code: string | null = this.getPhoneCode(this.formCheckoutGroup.value.billing_phone_country_select);
    let flag: string | null = this.getPhoneFlag(this.formCheckoutGroup.value.billing_phone_country_select);

    if (code !== null) {
      let value: string = code + " ";

      this.formCheckoutGroup.patchValue({
        billing_phone: value,
        phoneSmsRememberMe: value
      });
    }

    if (flag !== null) {
      this.currentBillingPhoneFlag = flag;
    }
  }

  public onInputTextMeChange(): void {
    this.sendSmsMessage = this.formCheckoutGroup.value.checkBoxTextMe;
  }
  public onInputUseShippingAddressChange(): void {
    this.useShippingAddressAsBillingAddress = this.formCheckoutGroup.value.checkBoxUseBillingAddress;
  }
  public onInputRememberMeChange(): void {
    this.rememberMeChecked = this.formCheckoutGroup.value.checkBoxRememberMe;
  }
  public onInputDeprecatedChange(): void {
    this.checkBoxDeprecatedChecked = this.formCheckoutGroup.value.checkBoxDeprecated;
  }

  public shipToAddressClick(): void {
    this.shipToAddressChecked = true;
    this.shipToPickupPointChecked = false;
  }
  public shipToPickUpPointClick(): void {
    this.shipToAddressChecked = false;
    this.shipToPickupPointChecked = true;
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
  public useMyLocation(): void {
    this.processing = true;

    setTimeout(() => {
      this.locationAllowed = confirm("Allow Vintina to access your location?");
      if (this.locationAllowed) {

      }
      this.processing = false;
    }, 500);
  }
  public optionBasicCardClick(): void {
    this.basicCardChecked = true;
    this.shopPayChecked = false;
    this.payPalChecked = false;
  }
  public optionShopPayClick(): void {
    this.shopPayChecked = true;
    this.basicCardChecked = false;
    this.payPalChecked = false;
  }
  public optionPayPalClick(): void {
    this.payPalChecked = true;
    this.shopPayChecked = false;
    this.basicCardChecked = false;
  }
  public numericInputOnly(e: KeyboardEvent): void {
    if (e.code.includes('Digit') || e.code.includes('Backspace')) {
      return;
    }
    e.preventDefault();
  }
  public numericInput(e: KeyboardEvent): void {

    this.labelExpirationDateActive = true;

    if (e.code.includes('Digit') || e.code.includes('Backspace') || e.code.includes('Slash')
    || e.code.includes('NumpadDivide')) {

      if (e.code.includes('Digit')) {
        let digit = parseInt(e.code.split('Digit')[1]);

        if (digit === 1 && this.formCheckoutGroup.value.expiry.length === 0) {
          return;
        }
        if (digit > 1 && this.formCheckoutGroup.value.expiry.length === 0) {
          this.formCheckoutGroup.patchValue({
            expiry: `0${digit}/`
          });
          e.preventDefault();
          return;
        }
        if (this.formCheckoutGroup.value.expiry.length === 1) {
          this.formCheckoutGroup.patchValue({
            expiry: this.formCheckoutGroup.value.expiry + `${digit}/`
          });
          e.preventDefault();
          return;
        }
        if (this.formCheckoutGroup.value.expiry.length > 6) {
          e.preventDefault();
        }
      }
      return;
    }
    e.preventDefault();
  }

  public onPrivacyPolicyClick(type: string): void {
    this.prompting = true;
    this.promptType = type;
  }
  public onSendGiftClick(): void {

    if (!this.giftMeesageReceived) {
      this.sendGift = true;
    }
    else {
      this.dropdownExpanded = !this.dropdownExpanded;
    }
  }

  public onEditGiftClick(): void {
    this.sendGift = true;
  }

  public onDeleteGiftClick(): void {
    this.removePopup = true;
  }

  public removeGiftClick(): void {
    this.giftMeesageReceived = false;
    this.dropdownExpanded = false;
    this.removePopup = false;

    this.giftMessageInfo = {
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
    };
  }

  public closePopup(): void {
    this.removePopup = false;
  }
  public onPromptClose(): void {
    this.prompting = false;
  }

  public onSendGiftClose(): void {
    this.sendGift = false;
  }

  public onSendGiftInfoSaved(e: any): void {
    this.giftMessageInfo = e;
    this.giftMeesageReceived = true;
    this.sendGift = false;
    console.log('GiftInfoSaved', this.giftMessageInfo);
  }

  public onScroll(el: HTMLElement): void {

    this.scroll = (el.scrollTop > 0 && el.scrollTop <= 30);
  }
  public onScrollEnd(): void {
    this.scroll = false;
  }

  public checkOverflow(el: HTMLElement): void
  {
    this.scroll = el.scrollHeight != Math.max(el.offsetHeight, el.clientHeight);
  }
}
