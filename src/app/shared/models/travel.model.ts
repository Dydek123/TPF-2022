import {Entity} from "./entity.model";
import {UserModel} from "./user.model";

export interface Travel extends Entity {
  destination: string;
  startPoint: string;
  date: string;
  freeSpace: number;
  car: string;
  duration: number;
  userId: string;
  cost: number;

  user: UserModel;
}
