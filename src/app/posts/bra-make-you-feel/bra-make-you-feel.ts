import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostCommentComponent} from '../../components/post-comment.component/post-comment.component';
import {ScrollTotopService} from '../../services/scrolltotop-service';

@Component({
  selector: 'app-bra-make-you-feel',
  imports: [
    RouterLink,
    PostCommentComponent
  ],
  templateUrl: './bra-make-you-feel.html',
  styleUrl: './bra-make-you-feel.css',
  standalone: true
})
export class BraMakeYouFeel implements OnInit {
  constructor(private scrollTotopService: ScrollTotopService) {
  }
  ngOnInit(): void {
    this.scrollTotopService.toTop();
  }
}
