import {Entity} from "./entity.model";

export interface CommentModel extends Entity {
  comment: string;
  rating: number;
  userId: string;
}
