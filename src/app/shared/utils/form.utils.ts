export class FormUtils {
  public static readonly RESET_TIMEOUT_MILISECONDS = 3000;
  public static readonly RESET_TIMEOUT_SECONDS = FormUtils.RESET_TIMEOUT_MILISECONDS / 1000;

  public static TIMER_SECONDS: number;

  private static interval: NodeJS.Timer;

  public static startTimer() {
    this.TIMER_SECONDS = FormUtils.RESET_TIMEOUT_SECONDS;
    this.interval = setInterval(() => {
      if (this.TIMER_SECONDS > 0) {
        this.TIMER_SECONDS--
      }
    }, 1000)
  }

  public static pauseTimer() {
    clearInterval(this.interval);
  }
}
