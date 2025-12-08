import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import {AccessoryType, Feeds, InstagramFeed} from '../instagram-feeds/feed-type';
import {CurrencyPipe} from '@angular/common';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';

@Component({
  selector: 'app-modal-instagram',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './modal-instagram.html',
  styleUrl: './modal-instagram.css',
})
export class ModalInstagram {

  @Input({required: true, transform: numberAttribute}) tmIndex: number = -1;
  @Output() instagramFeedClose = new EventEmitter<void>();
  @Output() viewProduct = new EventEmitter<string>();

  public timeline: InstagramFeed[] = [];
  public linkActive: boolean[] = [];
  public prevBtnActive: boolean = false;
  public nextBtnActive: boolean = false;
  deviceInfo: DeviceInfo | undefined;
  public isMobile: boolean = false;
  public isDesktopDevice: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.timeline = Feeds;

    this.init();
  }

  public init() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktopDevice = this.deviceService.isDesktop();

    console.log(this.isDesktopDevice);


    if (this.timeline[this.tmIndex].accessories !== undefined) {

      let signals: boolean[] = [];
      this.timeline[this.tmIndex].accessories?.forEach((item: AccessoryType) => {
        signals.push(false);
      });

      this.linkActive = signals;
    }
    this.prevBtnActive = this.tmIndex === 0;
    this.nextBtnActive = this.tmIndex >= this.timeline.length - 1;
  }

  public onClose(): void {
    this.instagramFeedClose.emit();
  }
  public onLinkHover(index: number): void {
      this.linkActive[index] = true;
  }
  public onLinkLeave(index: number): void {
      this.linkActive[index] = false;
  }

  public prevClick(): void {
    this.tmIndex -= 1;
    this.init();
  }
  public nextClick(): void {
    this.tmIndex += 1;
    this.init();
  }
  public onLinkClick(type: string): void {
    this.viewProduct.emit(type);
  }
}
