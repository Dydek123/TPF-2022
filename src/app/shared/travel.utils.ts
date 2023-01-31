import {Travel} from "./models/travel.model";

export class TravelUtils {
  public static readonly USER_DEFAULT_PHOTO = 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  public static getUserPicture(travel: Travel): string {
    if (travel.user && travel.user.picture) {
      return travel.user.picture;
    }
    return TravelUtils.USER_DEFAULT_PHOTO;
  }
}
