---
title: "Internationalization (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/internationalization/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Internationalization (part 2 of 4)

## Formatting data

A major use case of `Intl` is to output locale-specific texts representing structured data. This is similar to translation software, but instead of letting you translate arbitrary text, it takes data such as dates, numbers, and lists, and formats them according to locale-specific rules.

The `Intl.DateTimeFormat`, `Intl.DurationFormat`, `Intl.ListFormat`, `Intl.NumberFormat`, and `Intl.RelativeTimeFormat` objects each format one kind of data. Each instance provides two methods:

- `format()`: Takes a piece of data and returns a string using the formatting rule as determined by the locale and options.
- `formatToParts()`: Takes the same data and returns the same string, but broken down into parts, each part being an object with a `type` and a `value`. This is useful for more advanced use cases, such as interleaving the formatted text with other texts.

For example, here's a typical use of the `Intl.NumberFormat` object:

```js
// 1. Construct a formatter object, specifying the locale and formatting options:
const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 2. Use the `format` method of the formatter object to format a number:
console.log(price.format(5.259)); // $5.26

// Or, use the `formatToParts` method to get the formatted number
// broken down into parts:
console.table(price.formatToParts(5.259));
// |   | type       | value |
// | 0 | "currency" | "$"   |
// | 1 | "integer"  | "5"   |
// | 2 | "decimal"  | "."   |
// | 3 | "fraction" | "26"  |
```

You don't always have to construct a formatter object in order to format strings. For casual use, you can also directly call the `toLocaleString()` method on the data, passing the locale and options as arguments. The `toLocaleString()` method is implemented by `Temporal.PlainDate.prototype.toLocaleString()`, `Temporal.Duration.prototype.toLocaleString()`, `Number.prototype.toLocaleString()`, and so on. Read the documentation for the data you are formatting to see if it supports `toLocaleString()`, and what formatter options it corresponds to.

```js
console.log(
  (5.259).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  }),
); // $5.26
```

Note that `toLocaleString()` is potentially less efficient than using a formatter object, because every time `toLocaleString` is called, it has to perform a search in a big database of localization strings. When the method is called many times with the same arguments, it is better to create a formatter object and use its `format()` method, because a formatter object remembers the arguments passed to it and may decide to cache a slice of the database, so future `format` calls can search for localization strings within a more constrained context.

### Date and time formatting

`Intl.DateTimeFormat` formats dates and times, as well as ranges of dates and times. The `DateTimeFormat` object takes date/time inputs in one of the following forms: `Date`, `Temporal.PlainDateTime`, `Temporal.PlainTime`, `Temporal.PlainDate`, `Temporal.PlainYearMonth`, or `Temporal.PlainMonthDay`.

> **Note:**
> You can't pass a `Temporal.ZonedDateTime` object directly, because the time zone is already fixed in the object. You should use `Temporal.ZonedDateTime.prototype.toLocaleString()` or convert it to a `Temporal.PlainDateTime` object first.

Common use cases of localized date and time formatting are as follows:

- Output the same date and time in another calendar system, such as the Islamic, Hebrew, or Chinese calendar.
- Output the same real-world time (instant) but in another time zone.
- Selectively output certain components of the date and time, such as only the year and month, and the specific representation of them (such as "Thursday" or "Thu").
- Output the date according to locale-specific conventions, such as MM/DD/YYYY as in the U.S., DD/MM/YYYY as in the U.K., or YYYY/MM/DD as in Japan.
- Output the time according to locale-specific conventions, such as 12-hour or 24-hour clock.

To decide what the formatted string looks like, you first choose the calendar (which affects the year, month, week, and day calculation) and time zone (which affects the exact time as well as possibly the date). This is done using the aforementioned `calendar` option (or the `-ca-` extension key in the locale identifier), and the `timeZone` option.

- `Date` objects represent a unique instant in the user's time zone and in the ISO 8601 calendar (as reported by methods like `Date.prototype.getHours()` and `Date.prototype.getMonth()`). They are converted to the given `calendar` and `timeZone` by preserving the instant, so the date and time components may change.
- The various `Temporal` objects already have a calendar built-in, so the `calendar` option must be consistent with the calendar of the object—unless the date's calendar is `"iso8601"`, in which case it is converted to the requested `calendar`. These objects don't have a time zone, so they are directly displayed in the given `timeZone` without conversion.

Here we demonstrate how the combination of `calendar` and `timeZone` configurations result in different representations of the same instant.

```js
// Assume that the local time zone is UTC
const targetDate = new Date(2022, 0, 1); // 2022-01-01 midnight in the local time zone
const results = [];

for (const calendar of ["gregory", "hebrew"]) {
  for (const timeZone of ["America/New_York", "Asia/Tokyo"]) {
    const df = new Intl.DateTimeFormat("en-US", {
      calendar,
      timeZone,
      // More on these later
      dateStyle: "full",
      timeStyle: "full",
    });
    results.push({ calendar, timeZone, output: df.format(targetDate) });
  }
}

console.table(results);
```

The output looks like this:

| calendar  | timeZone           | output                                                          |
| --------- | ------------------ | --------------------------------------------------------------- |
| 'gregory' | 'America/New_York' | 'Friday, December 31, 2021 at 7:00:00 PM Eastern Standard Time' |
| 'gregory' | 'Asia/Tokyo'       | 'Saturday, January 1, 2022 at 9:00:00 AM Japan Standard Time'   |
| 'hebrew'  | 'America/New_York' | 'Friday, 27 Tevet 5782 at 7:00:00 PM Eastern Standard Time'     |
| 'hebrew'  | 'Asia/Tokyo'       | 'Saturday, 28 Tevet 5782 at 9:00:00 AM Japan Standard Time'     |

A date/time is comprised of the following components: `weekday`, `era`, `year`, `month`, `day`, `dayPeriod`, `hour`, `minute`, `second`, `fractionalSecondDigits`, and `timeZoneName`. Your next decision is what components to include in the output, and what forms they should take. You have two choices:

- You can manually configure each component, using options with the same name as the component. Only the components you specify will be included in the output, with the specified form.
- You can use the shortcuts `dateStyle` and `timeStyle`, which are predefined sets of components. They expand to a set of component options depending on the locale.

You should pick one of these two methods, because they are mutually exclusive. Using both methods simultaneously will result in an error.

Underlyingly, after requesting a combination of components, the `DateTimeFormat` object looks for a "template" that matches the requested components, so it only needs to fill in the values one by one. Not every combination of components has a predefined template. `DateTimeFormat` has a `formatMatcher` option that decides how to negotiate, by making components longer or shorter than requested, or by omitting or adding components. It gets quite technical, so you should read the `Intl.DateTimeFormat()` reference to better understand how it handles this.

Here, we demonstrate a few common ways to format the components:

```js
const df1 = new Intl.DateTimeFormat("en-US", {
  // Include all components (usually)
  dateStyle: "full",
  timeStyle: "full",
});

const df2 = new Intl.DateTimeFormat("en-US", {
  // Display the calendar date
  era: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const df3 = new Intl.DateTimeFormat("en-US", {
  // Display a time like on a digital clock
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "shortOffset",
});

const targetDate = new Date(2022, 0, 1, 12, 34, 56); // 2022-01-01 12:34:56 in the local time zone
console.log(df1.format(targetDate));
// Saturday, January 1, 2022 at 12:34:56 PM Coordinated Universal Time
// January 1, 2022 AD
// 12:34:56 PM GMT
```

There are other customization options. For example, you can use the `hourCycle` option to display the time in 12-hour or 24-hour and show midnight/noon as 12:00 or 0:00. You can also use the `numberingSystem` option to display any numbers in another numbering system.

Apart from `format()`, there's a second important method, `formatRange()`, which formats a range of dates or times. It takes two date-times of the same type, formats each one, joins them with a range separator (like the en-dash), and deduplicates the common parts.

```js
const springBreak = {
  start: new Date(2023, 2, 10),
  end: new Date(2023, 2, 26),
};

const df = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
console.log(df.formatRange(springBreak.start, springBreak.end));
// March 10 – 26, 2023
```
