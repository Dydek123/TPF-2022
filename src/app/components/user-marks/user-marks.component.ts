import {Component, HostListener, OnInit} from '@angular/core';
import {Context} from "../../shared/enum/context";
import {CardStatus} from "../../shared/enum/card-status";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../shared/models/user.model";
import {TravelUtils} from "../../shared/utils/travel.utils";
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
  isSmallScreen: boolean;
  showPopup: boolean;

  constructor(private authService: AuthService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.verifySmallScreen();
    this.loadUsers();
  }

  get hasAnyComment(): boolean {
    return !this.commentList || this.commentList.length === 0;
  }

  togglePopup() {
    this.showCommentPopup = !this.showCommentPopup;
  }

  toggleDetailsPopup() {
    this.showPopup = !this.showPopup;
  }

  getUserPicture(): string {
    return TravelUtils.getUserPicture(this.selectedUser);
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
    if (this.isSmallScreen) {
      this.showPopup = true;
    }
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

  @HostListener('window:resize', ['$event'])
  private verifySmallScreen(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }

  private loadUsers() {
    this.authService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        if (this.isSmallScreen) {
          this.selectedUser = this.users[0];
        }
        this.loadComments();
      })
  }

  private loadComments() {
    this.commentService.getAllForUser(String(this.selectedUser.id))
      .subscribe(comments => {
        this.commentList = comments;
      })
  }

  private getAverageRating(): number {
    return this.commentList.reduce((a, b) => a + b.rating, 0) / this.commentList.length;
  }
}
