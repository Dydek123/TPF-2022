export class UserUtils {
  private static readonly GOLD_STAR = '#FEC107';
  private static readonly GRAY_STAR = '#4f4f4f';

  public static getStarColor(cardRating: number, starOrder: number) {
    if (cardRating) {
      return starOrder <= cardRating ? UserUtils.GOLD_STAR : UserUtils.GRAY_STAR;
    }
    return UserUtils.GRAY_STAR;
  }
}
