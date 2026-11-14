---
title: "Representing dates & times (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Representing dates & times (part 3 of 4)

## Plain date-times, dates, and times

Zoned date-times are powerful but they are sometimes too powerful. In many situations, you actually only care about the date-time instead of the exact instant. For example:

- You set a reminder to celebrate New Year's Day on **December 31, 2026 at 23:59** regardless of where you are in the world
- You book a hotel from **December 22, 2026** to **December 27, 2026**, in whatever time zone your travel destination is and without a specified check-in/check-out time
- You set a daily alarm to wake up at **8:00** regardless of where you are in the world

To represent these information-restricted situations, you use:

- `Temporal.PlainDateTime` = `ZonedDateTime` minus the `timeZoneId`
- `Temporal.PlainDate` = `ZonedDateTime` minus the `timeZoneId` and time parts (`hour`, `minute`, etc.)
- `Temporal.PlainTime` = `ZonedDateTime` minus the `timeZoneId` and date parts (`calendarId`, `year`, `month`, etc.)

If you already have a `ZonedDateTime` object, you can convert it to these three forms using the `toPlainDateTime()`, `toPlainDate()`, and `toPlainTime()` methods:

```js
const mdnCreationDateTime = mdnCreation.toPlainDateTime();
const mdnCreationDate = mdnCreation.toPlainDate();
const mdnCreationTime = mdnCreation.toPlainTime();

console.log(mdnCreationDateTime.toLocaleString("en-US")); // "9/15/2020, 11:43:01 AM"
console.log(mdnCreationDate.toLocaleString("en-US")); // "9/15/2020"
console.log(mdnCreationTime.toLocaleString("en-US")); // "11:43:01 AM"
```

Or, you can use the methods `Temporal.PlainDateTime.from()`, `Temporal.PlainDate.from()`, `Temporal.PlainTime.from()`, passing properties for each component:

```js
const mdnCreationDate = Temporal.PlainDate.from({
  year: 2020,
  month: 9,
  day: 15,
});
```

"Why do I need a whole interface just to restrict myself," you might ask, "I should just use `ZonedDateTime` and remind myself to not use the properties I don't need." There are a few good reasons why you should rely on the dedicated interface.

First, there are minor differences about time calculations when using a `ZonedDateTime` versus a `PlainDateTime`, even when their date-times are the same. Consider a daylight saving transition. In the US, the day of November 3, 2024 was prolonged by 1 hour due to the clock being set back. That means if you have a time representing 00:00, November 3, 2024, and you ask "what's the time 12 hours from now?", you'll be surprised that it's not 12:00:

```js
const time1 = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2024,
  month: 11,
  day: 3,
});
const time2 = time1.add({ hours: 12 });
console.log(time2.toLocaleString("en-US")); // 11/3/2024, 11:00:00 AM EST
```

If, however, you perform the calculation on the _plain_ date-time instead, you'll get a different answer:

```js
const time1 = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2024,
  month: 11,
  day: 3,
});
const plainTime1 = time1.toPlainDateTime();
const plainTime2 = plainTime1.add({ hours: 12 });
const time2 = plainTime2.toZonedDateTime("America/New_York");
console.log(time2.toLocaleString("en-US")); // 11/3/2024, 12:00:00 PM EST
```

Which answer makes sense depends on what is more important for your use case—the resulting time or the duration. For example, if you need to cook a broth for 12 hours, the timer should go off exactly 12 hours from now, regardless of what the wall clock says. On the other hand, if you work a 12-hour shift, you should probably sit for another hour before signing off! Splitting these use cases into different classes makes the decision explicit.

The next problem is that the unused date/time fields are arbitrary and may interact badly with arithmetic. Suppose you use a ZDT to represent a whole day. What should the result be when you subtract a second or add a second? That would cause the time interval to cross two dates, and it's unclear which date to use. For example, if you use midnight as the underlying time, then subtracting one second would shift the date but adding one would not—a leak of abstraction.

```js
const fakeDate = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2020,
  month: 9,
  day: 15,
  // Time fields default to 0
});
console.log(fakeDate.subtract({ seconds: 1 }).day); // 14
console.log(fakeDate.add({ seconds: 1 }).day); // 15
```

By omitting the irrelevant information, you avoid accidentally leaking the abstraction.

```js
const realDate = Temporal.PlainDate.from({
  year: 2020,
  month: 9,
  day: 15,
});
// Adding/subtracting durations less than a day is always ignored
console.log(realDate.subtract({ seconds: 1 }).day); // 15
console.log(realDate.add({ seconds: 1 }).day); // 15
```

The remaining information is exposed through the same interface:

 |
 | `ZonedDateTime`
 | `PlainDateTime`
 | `PlainDate`
 | `PlainTime`

 | Calendar
 | `calendarId`
 | `calendarId`
 | `calendarId`
 | N/A

 | Year-related
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | `era``eraYear``year``inLeapYear``monthsInYear``daysInYear`
 | N/A

 | Month-related
 | `month``monthCode``daysInMonth`
 | `month``monthCode``daysInMonth`
 | `month``monthCode``daysInMonth`
 | N/A

 | Week-related
 | `weekOfYear``yearOfWeek``daysInWeek`
 | `weekOfYear``yearOfWeek``daysInWeek`
 | `weekOfYear``yearOfWeek``daysInWeek`
 | N/A

 | Day-related
 | `day``dayOfWeek``dayOfYear`
 | `day``dayOfWeek``dayOfYear`
 | `day``dayOfWeek``dayOfYear`
 | N/A

 | Time components
 | `hour``minute``second``millisecond``microsecond``nanosecond`
 | `hour``minute``second``millisecond``microsecond``nanosecond`
 | N/A
 | `hour``minute``second``millisecond``microsecond``nanosecond`

You may want to convert the plain time back to your local time when you have the extra information you need. For example, the New Year celebration reminder needs to know which instant to fire at. You can convert `PlainDateTime` and `PlainDate` objects back to `ZonedDateTime` by calling `toZonedDateTime()` and supplying the missing information (`timeZoneId` and, in the case of `PlainDate`, a `PlainTime`).

```js
const newYear = Temporal.PlainDate.from({
  year: 2026,
  month: 12,
  day: 31,
});
const reminder = newYear.toZonedDateTime({
  plainTime: { hour: 23, minute: 59 },
  timeZone: Temporal.Now.timeZoneId(),
});
```

## Plain year-months and month-days

You can remove further information from plain dates. Sometimes you don't even care about the whole year-month-day triple; you might only need a whole month in a year, or a recurring date in every year. The `Temporal.PlainYearMonth` and `Temporal.PlainMonthDay` objects provide such functionalities.

```js
// A special whole month
const prideMonth2026 = Temporal.PlainYearMonth.from({ year: 2026, month: 6 });
// A special calendar date for every year
const remembranceDay = Temporal.PlainMonthDay.from({ month: 11, day: 11 });
```

Year-months and month-days still store a full plain date internally, which is mostly used to deal with non-ISO calendars. Read the two classes' references, especially `Temporal.PlainYearMonth.from()` and `Temporal.PlainMonthDay.from()`, for more details about the reference day and what it does.

You can also convert back-and-forth between year-months/month-days and dates.

```js
const juneteenth2026 = prideMonth2026.toPlainDate({ day: 19 }); // 2026-06-19
const remembranceDay2026 = remembranceDay.toPlainDate({ year: 2026 }); // 2026-11-11
const mdnCreationMonth = mdnCreationDate.toPlainYearMonth(); // 2020-09
const bastilleDay = bastilleFall.toPlainDate().toPlainMonthDay(); // 07-14
```

## The RFC 9557 format

Dates are often passed between different systems, such as being stored in browser storage like IndexedDB, sent to your backend, etc. This requires a common serialization format. All `Temporal` objects implement the RFC 9557 format, based on ISO 8601 / RFC 3339. To convert an object to an RFC 9557 string, call its `toString()` method.

```js
const bastilleFallStr = bastilleFall.toString();
console.log(bastilleFallStr); // 1789-07-14T17:09:21+00:09[Europe/Paris]
```

Times and dates are most commonly data fields of bigger objects. All `Temporal` objects include a `toJSON()` method, so they are automatically JSON-serialized to the same format when the bigger object is serialized using `JSON.stringify()`.

```js
const mdnRepoHistory = JSON.stringify({ creation: mdnCreation });
console.log(mdnRepoHistory); // {"creation":"2020-09-15T11:43:01-04:00[America/New_York]"}
```

RFC 9557 strings can be converted back to their respective objects by passing them to the `from()` method:

```js
const bastilleFall2 = Temporal.ZonedDateTime.from(bastilleFallStr); // Another ZDT object
```

When you use `JSON.parse()`, you can use the `reviver` to parse the date fields:

```js
const mdnRepoHistoryParsed = JSON.parse(mdnRepoHistory, (key, value) => {
  if (key === "creation") return Temporal.ZonedDateTime.from(value);
  return value;
});
// { creation: ZonedDateTime {...} }
```

Each class supports a different subset of the RFC 9557 format (for example, plain date-times won't output the offset or time zone ID); each class reference page has an "RFC 9557 format" section that details the format it uses.
