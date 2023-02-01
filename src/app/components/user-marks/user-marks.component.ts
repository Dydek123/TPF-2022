import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../shared/models/user.model";
import {TravelUtils} from "../../shared/travel.utils";
import {CommentService} from "../../services/comment.service";
import {CommentModel} from "../../shared/models/comment.model";

@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.scss']
})
export class UserMarksComponent implements OnInit {
  context: Context = Context.USERS;
  cardStatus = CardStatus;
  showCommentPopup: boolean = false;
  commentList: CommentModel[];
  private users: UserModel[];
  selectedUser: UserModel;

  constructor(private authService: AuthService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  togglePopup() {
    this.showCommentPopup = !this.showCommentPopup;
  }

  private loadUsers() {
    this.authService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        this.selectedUser = this.users[0];
        this.loadComments();
      })
  }

  getUserPicture(): string {
    return TravelUtils.getUserPicture(this.selectedUser);
  }

  private loadComments() {
    console.log(this.selectedUser);
    this.commentService.getAllForUser(String(this.selectedUser.id))
      .subscribe(comments => {
        this.commentList = comments;
        console.log(this.commentList);
      })
  }

  onCommentAdd(event: CommentModel) {
    this.commentList.push(event);
  }
}
