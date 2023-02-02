import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../shared/models/user.model";
import {TravelUtils} from "../../shared/travel.utils";
import {CommentService} from "../../services/comment.service";
import {CommentModel} from "../../shared/models/comment.model";
import {HttpParams} from "@angular/common/http";

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
  users: UserModel[];
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
    this.commentService.getAllForUser(String(this.selectedUser.id))
      .subscribe(comments => {
        this.commentList = comments;
      })
  }

  onCommentAdd(event: CommentModel) {
    this.commentList.push(event);
    const averageRating = this.getAverageRating().toFixed(2);
    this.authService.updateRating(this.selectedUser, averageRating).subscribe(user => {
      this.selectedUser = user;
    });
  }

  onUserChanged(event: UserModel) {
    this.selectedUser = event;
    this.loadComments();
  }

  private getAverageRating(): number {
    return this.commentList.reduce((a, b) => a + b.rating, 0) / this.commentList.length;
  }

  onSearch(event: string) {
    let params = new HttpParams()
    if (event) {
      params = params.set('name', event);
    }
    this.authService.getAllUsers(params)
      .subscribe(users => {
        this.users = users;
      });
  }
}
