import { Femto, Duration } from '../lib/';

describe('Femto constructor', () => {

  test('new', () => {
    const femto = new Femto(2018, 6, 22, 21, 51, 32, 500);
    const date = new Date(2018, 5, 22, 21, 51, 32, 500);

    expect(femto.toEpochTime()).toBe(date.getTime());
  });

  test('now', () => {
    const femto = Femto.now();
    expect(typeof femto.toEpochTime()).toBe('number');
  });

  test('fromDate', () => {
    const date = new Date();
    const femto = Femto.fromDate(date);

    expect(femto.toEpochTime()).toBe(date.getTime());
  });

  test('fromEpochTime', () => {
    const epoch = 1529668049171;
    const femto = Femto.fromEpochTime(epoch);

    expect(femto.toEpochTime()).toBe(epoch);
  });
});

describe('Femto calc', () => {
  test('add', () => {
    const femto1 = new Femto(2018, 6, 22, 21, 57, 32, 574);
    const femto2 = new Femto(2018, 6, 24, 21, 57, 32, 574);
    const femto3 = new Femto(2018, 6, 22, 22, 59, 40, 699);

    const femtoSum1 = femto1.add(new Duration({ days: 2 }));
    const femtoSum2 = femto1.add(new Duration({ hours: 1, minutes: 2, seconds: 8, milliseconds: 125 }));

    expect(femtoSum1.toEpochTime()).toBe(femto2.toEpochTime());
    expect(femtoSum2.toEpochTime()).toBe(femto3.toEpochTime());
  });

  test('sub', () => {
    const femto1 = new Femto(2018, 6, 22, 21, 57, 32, 574);
    const femto2 = new Femto(2018, 6, 20, 21, 57, 32, 574);
    const femto3 = new Femto(2018, 6, 22, 20, 55, 24, 449);

    const femtoSum1 = femto1.sub(new Duration({ days: 2 }));
    const femtoSum2 = femto1.sub(new Duration({ hours: 1, minutes: 2, seconds: 8, milliseconds: 125 }));

    expect(femtoSum1.toEpochTime()).toBe(femto2.toEpochTime());
    expect(femtoSum2.toEpochTime()).toBe(femto3.toEpochTime());
  })
});

describe('Femto properties', () => {
  test('properties', () => {
    const femto = new Femto(2018, 6, 22, 21, 57, 32, 574);

    expect(femto.year).toBe(2018);
    expect(femto.month).toBe(6);
    expect(femto.day).toBe(22);
    expect(femto.minute).toBe(57);
    expect(femto.second).toBe(32);
    expect(femto.millisecond).toBe(574);
  });
});

describe('Femto comparison', () => {
  test('isSame', () => {
    const femto1 = new Femto(2018, 6, 22);
    const femto2 = new Femto(2018, 6, 22);

    expect(femto1.isSame(femto2)).toBeTruthy();
  });

  test('isBefore', () => {
    const femto1 = new Femto(2018, 6, 20);
    const femto2 = new Femto(2018, 6, 22);

    expect(femto1.isBefore(femto2)).toBeTruthy();
    expect(femto2.isBefore(femto1)).toBeFalsy();
  });

  test('isAfter', () => {
    const femto1 = new Femto(2018, 6, 20);
    const femto2 = new Femto(2018, 6, 18);

    expect(femto1.isAfter(femto2)).toBeTruthy();
    expect(femto2.isAfter(femto1)).toBeFalsy();
  });

  test('isSameOrBefore', () => {
    const femto1 = new Femto(2018, 6, 20);
    const femto2 = new Femto(2018, 6, 20);
    const femto3 = new Femto(2018, 6, 22);

    expect(femto1.isSameOrBefore(femto2)).toBeTruthy();
    expect(femto1.isSameOrBefore(femto3)).toBeTruthy();
    expect(femto3.isSameOrBefore(femto1)).toBeFalsy();
  });

  test('isSameOrAfter', () => {
    const femto1 = new Femto(2018, 6, 20);
    const femto2 = new Femto(2018, 6, 20);
    const femto3 = new Femto(2018, 6, 18);

    expect(femto1.isSameOrAfter(femto2)).toBeTruthy();
    expect(femto1.isSameOrAfter(femto3)).toBeTruthy();
    expect(femto3.isSameOrAfter(femto1)).toBeFalsy();
  });

  test('isBetween', () => {
    const femto1 = new Femto(2018, 6, 22);
    const femto2 = new Femto(2018, 6, 20);
    const femto3 = new Femto(2018, 6, 24);

    const femtoFrom = new Femto(2018, 6, 20);
    const femtoTo = new Femto(2018, 6, 24);

    expect(femto1.isBetween(femtoFrom, femtoTo)).toBeTruthy();
    expect(femto1.isBetween(femtoFrom, femtoTo, { includesFrom: true , includesTo: true})).toBeTruthy();

    expect(femto2.isBetween(femtoFrom, femtoTo, { includesFrom: true })).toBeTruthy();
    expect(femto3.isBetween(femtoFrom, femtoTo, { includesTo: true })).toBeTruthy();

    expect(femto2.isBetween(femtoFrom, femtoTo)).toBeFalsy();
    expect(femto3.isBetween(femtoFrom, femtoTo)).toBeFalsy();

    expect(femto2.isBetween(femtoFrom, femtoTo, { includesTo: true })).toBeFalsy();
    expect(femto3.isBetween(femtoFrom, femtoTo, { includesFrom: true })).toBeFalsy();
  });
});

describe('Femto conversion', () => {
  test('toDate', () => {
    const date = new Date();
    const femto = Femto.fromDate(date);

    expect(femto.toDate().getTime()).toBe(femto.toEpochTime());
  });

  test('toISOString', () => {
    const femto = new Femto(2018, 6, 22, 21, 57, 32, 574);
    const pattern = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/;

    expect(pattern.test(femto.toISOString())).toBeTruthy();
  });

  test('toFormatString', () => {
    const femto = new Femto(2018, 6, 22, 21, 57, 32, 574);

    expect(femto.toFormatString('YYYY/MM/DD HH:mm:ss:SSS')).toBe('2018/06/22 21:57:32:574');
    expect(femto.toFormatString('YYYY/M/D H:m:s:S')).toBe('2018/6/22 21:57:32:574');
  })
});