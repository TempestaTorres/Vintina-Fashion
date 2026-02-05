import {Component, OnDestroy, OnInit} from '@angular/core';
import {SlickService} from '../../services/slick-service';
import {PostCommentComponent} from "../../components/post-comment.component/post-comment.component";
import {ScrollTotopService} from '../../services/scrolltotop-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-five-types-of-bras',
  imports: [
    PostCommentComponent,
    RouterLink
  ],
  templateUrl: './five-types-of-bras.html',
  styleUrl: './five-types-of-bras.css',
  standalone: true
})
export class FiveTypesOfBras implements OnInit, OnDestroy {
  constructor(private slickService: SlickService, private scrollTotopService: ScrollTotopService) { }

  ngOnInit() {

    this.scrollTotopService.toTop();

    this.slickService.slickMount(".apsisac-slick-init", {
      autoplay: false,
      slidesToShow: 1,
      height: 548
    });
  }
  ngOnDestroy() {
    this.slickService.unslick();
  }
}
