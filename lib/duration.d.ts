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
export declare class Duration {
    protected _durationMilliseconds: number;
    constructor(time: Time);
    /**
     * Returns duration as milliseconds.
     * @returns {number}
     */
    toMilliseconds(): number;
}
export {};
