import {Entity} from "./entity.model";
import {Travel} from "./travel.model";
import {UserModel} from "./user.model";

export class ReservationModel extends Entity {
  travelId: number | string | undefined;
  userId: string;
  passengerId: string;
  isAccepted: boolean;

  travel: Travel;
  user: UserModel;
}
