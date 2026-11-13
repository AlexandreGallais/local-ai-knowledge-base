---
title: "Intl.DateTimeFormat() constructor (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/datetimeformat/datetimeformat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.DateTimeFormat() constructor (part 2 of 2)

## Examples

### Using DateTimeFormat

In basic use without specifying a locale, `DateTimeFormat` uses the default
locale and default options.

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// toLocaleString without arguments depends on the implementation,
// the default locale, and the default time zone
console.log(new Intl.DateTimeFormat().format(date));
// "12/19/2012" if run with en-US locale (language) and time zone America/Los_Angeles (UTC-0800)
```

### Using timeStyle and dateStyle

`dateStyle` and `timeStyle` provide a shortcut for setting multiple date-time component options at once. For example, for `en-US`, `dateStyle: "short"` is equivalent to setting `year: "2-digit", month: "numeric", day: "numeric"`, and `timeStyle: "short"` is equivalent to setting `hour: "numeric", minute: "numeric"`.

```js
const shortTime = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});
console.log(shortTime.format(Date.now())); // "1:31 PM"

const shortDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
});
console.log(shortDate.format(Date.now())); // "7/7/20"

const mediumTime = new Intl.DateTimeFormat("en-US", {
  timeStyle: "medium",
  dateStyle: "short",
});
console.log(mediumTime.format(Date.now())); // "7/7/20, 1:31:55 PM"
```

However, the exact (locale dependent) component styles they resolve to are not included in the resolved options. This ensures the result of `resolvedOptions()` can be passed directly to the `Intl.DateTimeFormat()` constructor (because an `options` object with both `dateStyle` or `timeStyle` and individual date or time component styles is not valid).

```js
console.log(shortDate.resolvedOptions().year); // undefined
```

### Using dayPeriod

Use the `dayPeriod` option to output a string for the times of day ("in the morning", "at night", "noon", etc.). Note, that this only works when formatting for a 12 hour clock (`hourCycle: 'h12'` or `hourCycle: 'h11'`) and that for many locales the strings are the same irrespective of the value passed for the `dayPeriod`.

```js
const date = Date.UTC(2012, 11, 17, 4, 0, 42);

console.log(
  new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hourCycle: "h12",
    dayPeriod: "short",
    timeZone: "UTC",
  }).format(date),
);
// 4 at night"  (same formatting in en-GB for all dayPeriod values)

console.log(
  new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hourCycle: "h12",
    dayPeriod: "narrow",
    timeZone: "UTC",
  }).format(date),
);
// "4 mat."  (same output in French for both narrow/short dayPeriod)

console.log(
  new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hourCycle: "h12",
    dayPeriod: "long",
    timeZone: "UTC",
  }).format(date),
);
// "4 du matin"
```

### Using timeZoneName

Use the `timeZoneName` option to output a string for the timezone ("GMT", "Pacific Time", etc.).

```js
const date = Date.UTC(2021, 11, 17, 3, 0, 42);
const timezoneNames = [
  "short",
  "long",
  "shortOffset",
  "longOffset",
  "shortGeneric",
  "longGeneric",
];

for (const zoneName of timezoneNames) {
  // Do something with currentValue
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: zoneName,
  });
  console.log(`${zoneName}: ${formatter.format(date)}`);
}

// Logs:
// short: 12/16/2021, PST
// long: 12/16/2021, Pacific Standard Time
// shortOffset: 12/16/2021, GMT-8
// longOffset: 12/16/2021, GMT-08:00
// shortGeneric: 12/16/2021, PT
// longGeneric: 12/16/2021, Pacific Time
```

## See also

- `Intl.DateTimeFormat`
- `Intl.supportedValuesOf()`
- `Intl`
