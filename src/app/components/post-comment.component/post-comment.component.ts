import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Comment} from '../../comments/comment-type';
import {DateService} from '../../services/date-service';

@Component({
  selector: 'app-post-comment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css',
})
export class PostCommentComponent {

  // Form group
  public commentFormGroup: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.maxLength(65525)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(245)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    url: new FormControl('', [Validators.maxLength(200)]),
    cookies: new FormControl('yes'),
  });

  public comments: Comment[] = [];

  constructor(private dateService: DateService) {
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();

    if (this.commentFormGroup.valid) {

      let date: string  = this.dateService.getDateToday();

      let newComment: Comment = {
        author: this.commentFormGroup.value.author,
        content: this.commentFormGroup.value.comment,
        date: date,
        approved: false
      }

      if (this.commentFormGroup.value.url.length > 0) {
        newComment.url = this.commentFormGroup.value.url;
      }

      this.comments.push(newComment);

      this.commentFormGroup.reset();
      console.log(newComment);
    }
  }
}
