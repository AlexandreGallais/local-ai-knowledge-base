---
title: "Representing dates & times (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Representing dates & times (part 2 of 4)

## Zoned date-times

If we were designing the date-time notation system from scratch, we could represent "18520 days, 15 hours, 43 minutes, and 1 second from the epoch" as `18520 15:43:01`. But this format is not convenient for humans, for two reasons: we are not very good at processing large numbers like `18520`, and the time `15:43:01` does not correspond to the sun's position in the sky at a particular location (such as New York)—we are used to 00:00 being midnight, 12:00 being noon, etc. We have created two systems to fix these problems: the _calendar_ and the _time zone_.

For subsequent demonstrations, let's convert our two instant examples to `Temporal.ZonedDateTime` (ZDT) objects with the `toZonedDateTimeISO()` method, which takes a time zone name. Now you can use the `toLocaleString()` method to directly print out a user-friendly string, without providing a time zone like we previously did with `Instant`.

```js
const mdnCreationInst = new Temporal.Instant(1600184581000000000n);
const bastilleFallInst = new Temporal.Instant(-5694908400000000000n);

const mdnCreation = mdnCreationInst.toZonedDateTimeISO("America/New_York");
const bastilleFall = bastilleFallInst.toZonedDateTimeISO("Europe/Paris");

console.log(mdnCreation.toLocaleString("en-US")); // 9/15/2020, 11:43:01 AM EDT
console.log(bastilleFall.toLocaleString("en-US")); // 7/14/1789, 5:09:21 PM GMT+0:09:21
```

> **Note:**
> The `Instant` does not have a time zone while the `ZonedDateTime` mandates one, so it must be provided during the `toZonedDateTimeISO()` conversion. However, the method does not take a calendar name, because its name "ISO" tells us that the ISO calendar will be used.

Because a ZDT is a wrapper around the `Instant` object, everything you can do with an `Instant`, you can do so with a ZDT too: `epochMilliseconds`, `epochNanoseconds`, `compare()`, `add()`/`subtract()`, `since()`/`until()`. You can also get the `Instant` back from the `ZonedDateTime` using `toInstant()`.

> **Note:**
> Because the ZDT is aware of calendars, arithmetic works slightly differently (for example, it can give you answers in years and months, whereas `Instant` can only give you seconds). We'll ignore these differences for now.

### Understanding the calendar

To break down large numbers of days, we invent _calendar units_ like weeks, months, years, and sometimes eras. A _calendar system_ answers questions like how many days are in a particular month and how many months are in a particular year. You probably already have a good understanding of how the Gregorian calendar works (12 months per year; 28–31 days per month; a leap year roughly every 4 years; leap years have an extra day in February; etc.), but it's important to remember that none of these assumptions may hold in other calendars, so you must be cautious when interpreting months and years. Today, the Gregorian calendar is ubiquitous and is widely used for cross-cultural communication. However, different cultures often use traditional calendars, for example for cultural, religious, or political purposes. The `Temporal` reference details how different calendars work.

The ISO 8601 calendar is based on the Gregorian calendar. They have identical month and year counting rules, but ISO 8601 does not use eras and has week numbering rules. The `toZonedDateTimeISO()` method produces `ZonedDateTime` objects in this calendar; you can tell from the `calendarId`:

```js
console.log(mdnCreation.calendarId); // "iso8601"
```

In ISO 8601, the `year`, `month`, and `day` properties are identical to their Gregorian representations and give you what you'd expect.

```js
console.log(mdnCreation.year, mdnCreation.month, mdnCreation.day);
// 2020 9 15
```

> **Note:**
> Years change monotonically, so for example the year before `1` (1 CE) is `0` (1 BCE), then `-1` (2 BCE), and so on.

Year-month-day is not the only way to number days. ISO 8601 additionally provides year-week-day. For this you use `yearOfWeek`, `weekOfYear`, and `dayOfWeek`. For example, mdn/content was created on the Tuesday of the 38th week of 2020.

```js
console.log(
  mdnCreation.yearOfWeek,
  mdnCreation.weekOfYear,
  mdnCreation.dayOfWeek,
);
// 2020 38 2
```

> **Note:**
> Although `yearOfWeek` and `year` are equal in this case, they may not always be. If a week crosses a year, there are additional rules to decide if it belongs to the next or the previous year, in which case a day may belong to the previous year when counting by months, but to the next year when counting by weeks, and vice versa.

The third mode is year-day. For this you use `year` and `dayOfYear`. For example, mdn/content was created on the 259th day of 2020.

```js
console.log(mdnCreation.year, mdnCreation.dayOfYear); // 2020 259
```

Instead of a single monotonic year counter, many calendars group years into eras. ISO 8601 doesn't use this, but the Gregorian calendar does. It has two eras: CE and BCE, where years are numbered in the order of 3 BCE, 2 BCE, 1 BCE, 1 CE, 2 CE, ... So year numbers are always positive. You use `era` and `eraYear` to retrieve this information, and you can use them as a pair for every purpose that you use `year` for.

```js
const mdnCreationGreg = mdnCreation.withCalendar("gregory");
console.log(mdnCreationGreg.era, mdnCreationGreg.eraYear); // ce 2020
```

Instead of identifying months by numbers, many languages/calendars give them names like "January", "February", etc. But there's one problem: some calendars use leap _months_ (which adds an extra month) instead of leap _days_ (which adds an extra day). Furthermore, this month can be added in the middle of the year. Take the `chinese` calendar as an example. It normally names each month using a number, so the first month is literally called "month 1" (一月), and so on. But when a leap month is needed, it just repeats a certain month. For example, year 2020 happens to be a leap year in the Chinese calendar (check with `inLeapYear`). In this year, "month 4" is repeated as "leap month 4" (闰四月), so the months in that year are named "month 3" (index 3), "month 4" (index 4), "leap month 4" (index 5), "month 5" (index 6), and so on. The mdn/content creation time falls on "month 7", so its index is 8. But a month with the same name having index 7 in some years and index 8 in others causes problems for many use cases. Therefore, the `monthCode` property allows you to identify months using the calendar convention—two months in different years with the same code are identical months, even if they have different index numbers in their respective years. You can use `monthCode` for every purpose that you use `month` for.

```js
const mdnCreationChi = mdnCreation.withCalendar("chinese");
console.log(mdnCreationChi.inLeapYear); // true
console.log(mdnCreationChi.month); // 8
console.log(mdnCreationChi.monthCode); // "M07"
```

> **Note:**
> As you can see, this `monthCode` is not intended to be human-readable (and its format is standardized across calendars). You should use `Intl.DateTimeFormat` to provide a readable name in the target language. This property is purely for computation purposes.

A group of properties—`daysInMonth`, `daysInWeek`, `daysInYear`, and `monthsInYear`—help you retrieve the counting rules for this calendar for the specific date.

### Understanding the time zone

The time `15:43:01` is based on an epoch representing midnight in UTC, whose time of day approximately follows the mean solar time at Greenwich, London. Each longitude has a different local time. The sun's apparent motion is not uniform, but it moves 360° around the Earth in 24 hours, so on average, two clocks 1° apart in longitude will have a 4-minute difference. The time kept by a clock that synchronizes with the local sun position, assuming uniform motion, is called the _local mean time_. Usually, an entire region uses the local time of a clock at some important location (it would be very inconvenient if two nearby towns had clocks that are a few minutes apart); this region is called a _time zone_. The difference between the time in that time zone and UTC is called the _time zone offset_.

Each ZDT is associated with a time zone, identified by the `timeZoneId` (which uses the name of a city in that time zone). You can get its offset using the `offsetNanoseconds` property (which returns a number) or the `offset` property (which returns a string).

```js
console.log(bastilleFall.timeZoneId); // "Europe/Paris"
console.log(bastilleFall.offsetNanoseconds); // 561000000000
console.log(bastilleFall.offset); // "+00:09:21"
```

The sun reaches its highest position in Paris roughly **9 minutes** before it does in London. Therefore, a clock keeping Paris mean time will be about 9 minutes ahead of a clock keeping Greenwich mean time so that they synchronize in tracking the sun's position. This is why our "fall of the Bastille" instant, which is `17:00:00` in UTC, becomes `17:09:21` in the local mean time used for Paris by the time zone database—that's 9 minutes 21 seconds ahead!

Time zone offsets are not constant; for a given time zone, they can change multiple times, or even alternate throughout history. This is why two ZDTs representing different instants may report different offsets, despite being in the same time zone. There are many factors that affect the offset:

- The `+00:09:21` offset explained above is the Paris mean time, used by Paris and the Metropolitan France in older times (like when the Bastille fell). Similarly, New York originally used the offset `-04:56:02`.
- During the late nineteenth and early twentieth centuries, as international travel became more common, having these irregular offsets turned out to be a great nuisance, especially when reading train time tables or adjusting watches. Countries increasingly adopted **standardized time zones**, often with offsets in whole hours from Greenwich Mean Time (GMT). For example, Metropolitan France switched to GMT in 1911. At what would have been midnight on March 11 under the old offset, clocks were set backward by 9 minutes 21 seconds to 23:50:39 on March 10:

  | UTC time            | Local time          | Offset    |
  | ------------------- | ------------------- | --------- |
  | 1911-03-10 23:41:18 | 1911-03-10 23:50:39 | +00:09:21 |
  | 1911-03-10 23:41:19 | 1911-03-10 23:50:40 | +00:09:21 |
  | 1911-03-10 23:50:38 | 1911-03-10 23:59:59 | +00:09:21 |
  | 1911-03-10 23:50:39 | 1911-03-10 23:50:39 | +00:00:00 |
  | 1911-03-10 23:50:40 | 1911-03-10 23:50:40 | +00:00:00 |

  Similarly, when the five-time-zone system of the US was standardized in 1883, the Eastern time zone used the `-05:00` offset, which was the closest to `-04:56:02`.

  This standardized time zone is sometimes called the "natural" time zone because it still more or less reflects the local sun position in the anchor city. (The error may become greater as the region extends.)

- Two regions with frequent communications may wish to align their time zone offsets. For example, during WWII, German-occupied France adopted the Berlin offset `+01:00`, which persists to this day. Similarly, the Pacific island country of Samoa changed its offset from `-11:00` to `+13:00`, effectively skipping the calendar day of December 30, 2011, to stay on the same day as Australia.
- Daylight saving time is recorded as part of the time zone offset, so the offset can also alternate each year. For example, Paris changes its offset from `+01:00` to `+02:00` during each summer. Our mdn/content creation example also falls in the DST period in the Eastern time zone, so it reports an offset of `-04:00` instead of `-05:00`:

  ```js
  console.log(mdnCreation.offsetNanoseconds); // -14400000000000
  console.log(mdnCreation.offset); // "-04:00"
  ```

  > **Note:**
  > Remember the mnemonic "spring forward, fall back"—the clocks jump forward by an hour in spring, and go back by an hour in fall.

A **time zone database** takes an instant and a region (identified by a city like `Europe/Paris`) and tells you what offset was used by clocks in that region at that particular instant. The `Temporal.Now.timeZoneId()` method gives you the time zone ID for your current JavaScript environment (which usually follows your system settings):

```js
console.log(Temporal.Now.timeZoneId()); // e.g.: "Europe/Paris"
```

The `Temporal.ZonedDateTime` reference also has a detailed explanation of the IANA time zone database used by JavaScript, including some caveats about corner cases involving time zone transitions. We _highly recommend_ that you always keep these cases in mind. The `ZonedDateTime` object provides methods and properties including `hoursInDay` (not always 24!), `startOfDay()` (not always 00:00!), and `getTimeZoneTransition()` to help you deal with such irregularities.

Once a time zone is defined, retrieve the local time using `hour`, `minute`, `second`, `millisecond`, `microsecond`, and `nanosecond`.

```js
console.log(mdnCreation.hour, mdnCreation.minute, mdnCreation.second);
// 11 43 1
```

### Putting the three pieces together

Now we have a nanosecond offset from the epoch (which we can represent as a `Temporal.Instant` object), a `calendarId` to calculate the date part of it, and a `timeZoneId` to calculate the time part of it (which may also set the date back or forth by a day in some cases). Put these three together, and we have a `Temporal.ZonedDateTime` (ZDT) object. Indeed, that's how you construct such an object with the `Temporal.ZonedDateTime()` constructor.

```js
const mdnCreation = new Temporal.ZonedDateTime(
  1600184581000000000n,
  "America/New_York",
  "gregory", // Defaults to "iso8601"
);
```

### Constructing a ZonedDateTime from a local date-time

You rarely have an existing timestamp in the form of a nanosecond offset from the epoch. Above, we did the math ourselves to get numbers like `-5694908400000000000n`, but you are more likely to construct ZDTs directly from the local time. To do so, use `Temporal.ZonedDateTime.from()`:

```js
const mdnCreation = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York", // Required
  year: 2020, // Required
  month: 9, // Required
  day: 15, // Required
  hour: 11, // Defaults to 0
  minute: 43, // Defaults to 0
  second: 1, // Defaults to 0
  // The rest (millisecond, microsecond, nanosecond) default to 0
  // calendar defaults to "iso8601"
});

console.log(mdnCreation.epochNanoseconds); // 1600184581000000000n
```

Other calendar date representations can be used too, if the calendar supports them. For example, you can pass `era` and `eraYear` instead of `year`, or `monthCode` instead of `month`.
