import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../shared/models/user.model";
import {CommentService} from "../../services/comment.service";
import {CommentModel} from "../../shared/models/comment.model";
import {FormUtils} from "../../shared/utils/form.utils";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  form: FormGroup;
  isAdded: boolean;

  @Output() commentAdd: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Input() user: UserModel;

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  get timer(): number {
    return FormUtils.TIMER_SECONDS;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      userId: [this.user.id, Validators.required]
    })
  }

  onSubmit() {
    this.commentService.add(this.form.value)
      .subscribe((comment) => {
        this.commentAdd.emit(comment)
        this.isAdded = true;
        FormUtils.startTimer();
        setTimeout(() => {
          this.isAdded = false;
          this.form.reset();
          FormUtils.pauseTimer();
        }, FormUtils.RESET_TIMEOUT_MILISECONDS)
      });
  }

  changeRating(number: number) {
    this.form.patchValue({
      rating: number
    });
  }
}
