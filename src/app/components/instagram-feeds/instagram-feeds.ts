import {Component, EventEmitter, Output} from '@angular/core';
import {Feeds, InstagramFeed} from './feed-type';
import {NgStyle} from '@angular/common';
declare var Swiper: any;

@Component({
  selector: 'app-instagram-feeds',
  imports: [
    NgStyle
  ],
  templateUrl: './instagram-feeds.html',
  styleUrl: './instagram-feeds.css',
})
export class InstagramFeeds {
  @Output()
  timelineClicked: EventEmitter<any> = new EventEmitter();
  private swiper: any;
  public feeds: InstagramFeed[] = [];

  constructor() {
  }

  ngOnInit() {
    this.feeds = Feeds;
  }
  ngAfterViewInit() {
      this.swInit();
  }

  private swInit(): void {
    this.swiper = new Swiper('.fs-slider-container', {

      navigation: {
        prevEl: ".fs-slider-prev-button",
        nextEl: ".fs-slider-next-button"
      },
      breakpoints: {
        360: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 34,
        },
        768: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 66,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 78,
        }
      },
      keyboard: false,
      thumbnail: null,
    });
  }
  public onTimeLineClick(index: number): void {
    this.timelineClicked.emit(index);
  }
}
