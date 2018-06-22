interface Time {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

/**
 * A span of time.
 *
 * To create a `Duration`, pass values to the constructor.
 *
 *     const duration1 = new Duration({days: 3, hours: 2, minutes: 10});
 *     const duration2 = new Duration({seconds: 43, milliseconds: 548});
 *     const duration3 = new Duration({days: 100, seconds: 53});
 */
export class Duration {
  protected _durationMilliseconds: number;

  constructor(time: Time) {
    const daysMs = time.days ? time.days * 1000 * 60 * 60 * 24 : 0;
    const hoursMs = time.hours ? time.hours * 1000 * 60 * 60 : 0;
    const minutesMs = time.minutes ? time.minutes * 1000 * 60 : 0;
    const secondsMs = time.seconds ? time.seconds * 1000 : 0;
    const ms = time.milliseconds ? time.milliseconds : 0;

    this._durationMilliseconds = daysMs + hoursMs + minutesMs + secondsMs + ms;
  }

  /**
   * Returns duration as milliseconds.
   * @returns {number}
   */
  toMilliseconds(): number {
    return this._durationMilliseconds;
  }
}
