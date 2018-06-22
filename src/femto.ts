import { Duration } from './duration';
import { FemtoFormatter } from './formatter';

/**
 * An object representing date.
 *
 * `Femto` is a core class of femtofiber, which represents date.
 *
 * You can create a `Femto` object in several ways.
 *
 *     const femto1 = new Femto(2018, 6, 22);                  // from number
 *     const femto2 = new Femto(2018, 6, 22, 21, 54, 31, 500); // from numbers with time
 *     const femto3 = Femto.fromDate(new Date());              // from Date
 *     const femto4 = Femto.now();                             // from current date
 *     const femto5 = Femto.fromEpochTime(1529590253022);      // from epoch time
 *
 * A `Femto` object is immutable, so once created, its value does not change.
 *
 * To get values, use properties.
 *
 *     const femto = Femto.now();
 *     console.log(femto.year);
 *     console.log(femto.month); // January is 1, and December is 12
 *     console.log(femto.day);
 *     console.log(femto.hour);
 *     console.log(femto.minute);
 *     console.log(femto.second);
 *     console.log(femto.millisecond);
 *
 * A `Femto` object also can output formatted string.
 *
 *     const femto = Femto.now();
 *     console.log(femto.toFormatString('YYYY/MM/DD'));   // "2018/06/22"
 *     console.log(femto.toFormatString('HH:mm:ss:SSS')); // "18:23:27:758"
 *
 * A `Femto` object has manipulating methods. You can manipulate date with [[Duration]] objects.
 *
 *     const tomorrow = Femto.now().add(new Duration({days: 1}));
 *     const yesterday = Femto.now().sub(new Duration({days: 1}));
 *
 * You can also compare two Femtos.
 *
 *     const current = 1529665309363;
 *     const femto1 = Femto.fromEpochTime(current);
 *     const femto2 = Femto.fromEpochTime(current);
 *
 *     // These methods returns boolean.
 *     femto1.isSame(femto2);
 *     femto1.isBefore(femto2);
 *     femto1.isAfter(femto2);
 *     femto1.isSameOrBefore(femto2);
 *     femto1.isSameOrAfter(femto2);
 *
 *     Femto.now().isBetween(femto1, femto2);
 *     Femto.now().isBetween(femto1, femto2, {
 *       includesFrom: true,
 *       includesTo: true
 *     });
 */
export class Femto {
  protected _date: Date;
  protected _formatter: FemtoFormatter;

  constructor(
    year: number,
    month: number,
    day: number = 1,
    hour: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0
  ) {
    this._date = new Date(
      year,
      month - 1,
      day,
      hour,
      minutes,
      seconds,
      milliseconds
    );
    this._formatter = new FemtoFormatter();
  }

  /**
   * Returns a `Femto` object created by `date`.
   * @param {Date} date
   * @returns {Femto}
   */
  static fromDate(date: Date): Femto {
    return new Femto(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  }

  /**
   * Returns a `Femto` object which represents current time.
   * @returns {Femto}
   */
  static now(): Femto {
    return Femto.fromDate(new Date());
  }

  /**
   * Returns a `Femto` object created from `epoch` time.
   * @param {number} epoch Milliseconds since January 1, 1970, 00:00:00 UTC.
   * @returns {Femto}
   */
  static fromEpochTime(epoch: number): Femto {
    return Femto.fromDate(new Date(epoch));
  }

  /**
   * Returns new `Femto` object which is `duration` ahead of this `Femto`.
   * @param {Duration} duration
   * @returns {Femto}
   */
  add(duration: Duration): Femto {
    const date = new Date(this.toEpochTime() + duration.toMilliseconds());
    return Femto.fromDate(date);
  }

  /**
   * Returns new `Femto` object which is `duration` behind of this `Femto`.
   * @param {Duration} duration
   * @returns {Femto}
   */
  sub(duration: Duration): Femto {
    const date = new Date(this.toEpochTime() - duration.toMilliseconds());
    return Femto.fromDate(date);
  }

  /**
   * Returns `true` if this `Femto` and `other` `Femto` have completely same value.
   * Otherwise `false`.
   * @param {Femto} other
   * @returns {boolean}
   */
  isSame(other: Femto): boolean {
    return this.toEpochTime() === other.toEpochTime();
  }

  /**
   * Returns `true` if this `Femto` is before `other` Femto.
   * Otherwise false.
   *
   * ** Note: ** This method returns `false` if two Femtos have same value.
   * If you want `true` when two Femtos have same value, use `isSameOrBefore`.
   * @param {Femto} other
   * @returns {boolean}
   */
  isBefore(other: Femto): boolean {
    return this.toEpochTime() < other.toEpochTime();
  }

  /**
   * Returns `true` if this `Femto` is after `other` Femto.
   * Otherwise false.
   *
   * ** Note: ** This method returns `false` if two Femtos have same value.
   * If you want `true` when two Femtos have same value, use `isSameOrAfter`.
   * @param {Femto} other
   * @returns {boolean}
   */
  isAfter(other: Femto): boolean {
    return this.toEpochTime() > other.toEpochTime();
  }

  /**
   * Returns `true` if this `Femto` is same or before `other` Femto.
   * Otherwise `false`.
   * @param {Femto} other
   * @returns {boolean}
   */
  isSameOrBefore(other: Femto): boolean {
    return this.toEpochTime() <= other.toEpochTime();
  }

  /**
   * Returns `true` if this `Femto` is same or after `other` Femto.
   * Otherwise `false`.
   * @param {Femto} other
   * @returns {boolean}
   */
  isSameOrAfter(other: Femto): boolean {
    return this.toEpochTime() >= other.toEpochTime();
  }

  /**
   * Returns `true` if this `Femto` is between `from` and `to'.
   * Otherwise `false`.
   *
   * By default, this method returns `false` if this `Femto` and `from`(or `to`) are same.
   * If you want this method to include `from` or `to`, set `options` argument as follows:
   *
   *     femto.isBetween(from, to, {
   *       includesFrom: true,
   *       includesTo: true
   *     });
   * @param {Femto} from
   * @param {Femto} to
   * @param {{includesFrom?: boolean; includesTo?: boolean}} options
   * @returns {boolean}
   */
  isBetween(
    from: Femto,
    to: Femto,
    options: { includesFrom?: boolean; includesTo?: boolean } = {}
  ): boolean {
    const includesFrom =
      'includesFrom' in options ? options.includesFrom : false;
    const includesTo = 'includesTo' in options ? options.includesTo : false;

    const begin = includesFrom ? this.isSameOrAfter(from) : this.isAfter(from);
    const end = includesTo ? this.isSameOrBefore(to) : this.isBefore(to);

    return begin && end;
  }

  /**
   * Returns the year, according to local time.
   * @returns {number}
   */
  get year(): number {
    return this._date.getFullYear();
  }

  /**
   * Returns the month beginning with 1 for January to 12 for December.
   * @returns {number}
   */
  get month(): number {
    return this._date.getMonth() + 1;
  }

  /**
   * Returns the day of the month.
   * @returns {number}
   */
  get day(): number {
    return this._date.getDate();
  }

  /**
   * Returns the hour of the day, according to local time.
   * The value is from 0 to 23.
   * @returns {number}
   */
  get hour(): number {
    return this._date.getHours();
  }

  /**
   * Returns the minute of the hour, according to local time.
   * @returns {number}
   */
  get minute(): number {
    return this._date.getMinutes();
  }

  /**
   * Returns the second of the minute, according to local time.
   * @returns {number}
   */
  get second(): number {
    return this._date.getSeconds();
  }

  /**
   * Returns the millisecond of the second, according to local time.
   * @returns {number}
   */
  get millisecond(): number {
    return this._date.getMilliseconds();
  }

  /**
   * Returns a number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @returns {number}
   */
  toEpochTime(): number {
    return this._date.getTime();
  }

  /**
   * Returns `Date`.
   * @returns {Date}
   */
  toDate(): Date {
    return new Date(this._date.getTime());
  }

  /**
   * Returns ISO string.
   * @returns {string}
   */
  toISOString(): string {
    return this._date.toISOString();
  }

  /**
   * Returns a string which is `template` string replaced with values.
   *
   * This method takes a template string which includes special letters called "token",
   * and replace them with their corresponding values.
   *
   * For example, token 'YYYY' will be replaced with the year value like as '2018'.
   *
   *     Femto.now().format('YYYY');                // 2018
   *     Femto.now().format('YYYY/MM/DD');          // 2018/06/22
   *     Femto.now().format('YYYY/MM/DD HH:mm:ss'); // 2018/06/22 14:32:57
   *
   * In template, you can use following tokens:
   *
   * * YYYY: year
   * * MM: month(2-digits)
   * * M: month
   * * DD: day of the month(2-digits)
   * * D: day of the month
   * * HH: hour(2-digits)
   * * H: hour
   * * mm: minute(2-digits)
   * * m: minute
   * * ss: second(2-digits)
   * * s: second
   * * SSS: millisecond(3-digits)
   * * S: millisecond
   * @param {string} template
   * @returns {string}
   */
  toFormatString(template: string): string {
    return this._formatter.format(this, template);
  }
}
