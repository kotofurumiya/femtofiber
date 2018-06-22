import { Duration } from '../lib';

describe('Duration', () => {
  test('constructor', () => {
    const duration = new Duration({
      days: 15,
      hours: 8,
      minutes: 12,
      seconds: 41,
      milliseconds: 758
    });

    const milliseconds = (15 * 1000 * 60 * 60 * 24) + (8 * 1000 * 60 * 60) + (12 * 1000 * 60) + (41758);

    expect(duration.toMilliseconds()).toBe(milliseconds);
  });
});