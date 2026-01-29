import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostCommentComponent} from '../../components/post-comment.component/post-comment.component';

@Component({
  selector: 'app-bra-make-you-feel',
  imports: [
    RouterLink,
    PostCommentComponent
  ],
  templateUrl: './bra-make-you-feel.html',
  styleUrl: './bra-make-you-feel.css',
})
export class BraMakeYouFeel {

}
