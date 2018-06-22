# femtofiber

femtofiber is immutable date library for JavaScript.

## How to install

### Without Node.js(for browsers)

Download a zip file from [GitHub release page](https://github.com/kotofurumiya/femtofiber/releases),
and unzip it.
Then you can see `femtofiber.min.js` in `build` directory.
Copy `femtofiber.min.js` file to your project directory.

Import the file in your HTML as following:

```html
<script src="femtofiber.min.js"></script>
<script>
  // Write your code here!
</script>
```

### With Node.js(for server)

Run `npm install`.

```
npm install femtofiber --save 
```

And import it.

```
import { Femto, Duration } from 'femtofiber';
```

## Basic Usage

### Creating Femto

You can create a `Femto` object in several ways.

```javascript
const femto1 = new Femto(2018, 6, 22);                  // from numbers
const femto2 = new Femto(2018, 6, 22, 21, 54, 31, 500); // from numbers with time
const femto3 = Femto.fromDate(new Date());              // from Date
const femto4 = Femto.now();                             // from current date
const femto5 = Femto.fromEpochTime(1529590253022);      // from epoch time
```

A `Femto` object is immutable, so once created, its value does not change.

### Properties

To get values, use properties.

```javascript
const femto = Femto.now();
console.log(femto.year);
console.log(femto.month); // January is 1, and December is 12
console.log(femto.day);
console.log(femto.hour);
console.log(femto.minute);
console.log(femto.second);
console.log(femto.millisecond);
```

### Formatting string

A `Femto` object also can output formatted string.

```javascript
const femto = Femto.now();
console.log(femto.toFormatString('YYYY/MM/DD'));   // "2018/06/22"
console.log(femto.toFormatString('HH:mm:ss:SSS')); // "18:23:27:758"
```

### Calculation

A `Femto` object has manipulating methods. You can manipulate date with `Duration` objects.

```javascript
const tomorrow = Femto.now().add(new Duration({days: 1}));
const yesterday = Femto.now().sub(new Duration({days: 1}));
```

To create a `Duration` object, pass values to `Duration`'s constructor.

```javascript
const duration = new Duration({
  days: 4,
  hours: 7,
  minutes: 13,
  seconds: 6,
  milliseconds: 219
});
```

### Comparison

You can also compare two Femtos.

```javascript
const current = 1529665309363;
const femto1 = Femto.fromEpochTime(current);
const femto2 = Femto.fromEpochTime(current);

// These methods return boolean.
femto1.isSame(femto2);
femto1.isBefore(femto2);
femto1.isAfter(femto2);
femto1.isSameOrBefore(femto2);
femto1.isSameOrAfter(femto2);

Femto.now().isBetween(femto1, femto2);
Femto.now().isBetween(femto1, femto2, {
  includesFrom: true,
  includesTo: true
});
```
     
## API document

For more information, see [API Document](https://kotofurumiya.github.io/femtofiber/).

## License

MIT License. See [LICENSE.md](./LICENSE.md).