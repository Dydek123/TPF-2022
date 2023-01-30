import {Entity} from "./entity.model";

export interface Travel extends Entity {
  destination: string;
  startPoint: string;
  date: string;
  freeSpace: number;
  car: string;
  duration: number;
  userId: string;
}
