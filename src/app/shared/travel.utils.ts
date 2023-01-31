import {UserModel} from "./models/user.model";

export class TravelUtils {
  public static readonly USER_DEFAULT_PHOTO = 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  public static getUserPicture(user: UserModel): string {
    if (user && user.picture) {
      return user.picture;
    }
    return TravelUtils.USER_DEFAULT_PHOTO;
  }
}
