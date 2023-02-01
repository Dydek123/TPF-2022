import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../shared/models/comment.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private static COMMENT_URL = `${environment.apiUrl}/marks`;

  constructor(private http: HttpClient) {
  }

  add(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(CommentService.COMMENT_URL, comment);
  }

  getAllForUser(id: string): Observable<CommentModel[]> {
    const params = {
      userId: id
    }
    return this.http.get<CommentModel[]>(CommentService.COMMENT_URL, {params});
  }
}
