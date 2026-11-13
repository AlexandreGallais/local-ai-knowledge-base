---
title: "Temporal cookbook (part 4 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/cookbook/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal cookbook (part 4 of 4)

### Same date in another month

Likewise, here are some examples of taking an existing date and adjusting the month, but keeping the day and year the same.

Depending on the behavior you want, you will need to pick the right `overflow` option, but the default of `"constrain"` should be correct for most cases.

```js
const date = Temporal.PlainDate.from("2020-05-31");

// Same date and time, but in February
// (and use the last day if the date doesn't exist in February):

const feb = date.with({ month: 2 });

console.log(feb.toString()); // '2020-02-29'

// Same date and time, but in April
// (and throw an exception if the date doesn't exist in April):

date.with({ month: 4 }, { overflow: "reject" }); // Throws a RangeError
```

### Next weekly occurrence

The following function takes a starting `Temporal.ZonedDateTime`, a weekday from 1 (Monday) to 7 (Sunday), a `Temporal.PlainTime`, and a time zone identifier. It returns a `Temporal.ZonedDateTime` representing the next occurrence of the weekly event (for example, "weekly on Thursdays at 08:45 California time").

```js
function nextWeeklyOccurrence(now, weekday, eventTime, eventTimeZone) {
  const nowInEventTimeZone = now.withTimeZone(eventTimeZone);
  const nextDate = nowInEventTimeZone
    .toPlainDate()
    .add({ days: (weekday + 7 - nowInEventTimeZone.dayOfWeek) % 7 });
  let nextOccurrence = nextDate.toZonedDateTime({
    plainTime: eventTime,
    timeZone: eventTimeZone,
  });

  // Handle the case where the event is today but already happened
  if (Temporal.ZonedDateTime.compare(now, nextOccurrence) > 0) {
    nextOccurrence = nextOccurrence.add({ weeks: 1 });
  }

  return nextOccurrence.withTimeZone(now.timeZoneId);
}

// "Weekly on Thursdays at 08:45 California time":
const weekday = 4;
const eventTime = Temporal.PlainTime.from("08:45");
const eventTimeZone = "America/Los_Angeles";

const rightBefore = Temporal.ZonedDateTime.from(
  "2020-03-26T15:30+00:00[Europe/London]",
);
let next = nextWeeklyOccurrence(rightBefore, weekday, eventTime, eventTimeZone);
console.log(next.toString()); // '2020-03-26T15:45:00+00:00[Europe/London]'

const rightAfter = Temporal.ZonedDateTime.from(
  "2020-03-26T16:00+00:00[Europe/London]",
);
next = nextWeeklyOccurrence(rightAfter, weekday, eventTime, eventTimeZone);
console.log(next.toString()); // '2020-04-02T16:45:00+01:00[Europe/London]'
```

### Weekday of yearly occurrence

In some countries, when a public holiday falls on a Tuesday or Thursday, an extra "bridge" public holiday is observed on Monday or Friday in order to give workers a long weekend off. The following function takes a `Temporal.PlainMonthDay` and a year, and returns an array of `Temporal.PlainDate` values for the holiday and any bridge day, or an empty array if the holiday falls on a weekend.

```js
function bridgePublicHolidays(holiday, year) {
  const date = holiday.toPlainDate({ year });
  switch (date.dayOfWeek) {
    case 1: // Mon
    case 3: // Wed
    case 5: // Fri
      return [date];
    case 2: // Tue; take Monday off
      return [date.subtract({ days: 1 }), date];
    case 4: // Thu; take Friday off
      return [date, date.add({ days: 1 })];
    case 6: // Sat
    case 7: // Sun
      return [];
  }
}

const laborDay = Temporal.PlainMonthDay.from("05-01");

// No bridge day
console.log(bridgePublicHolidays(laborDay, 2020).map((d) => d.toString()));
// ['2020-05-01']

// Bridge day
console.log(bridgePublicHolidays(laborDay, 2018).map((d) => d.toString()));
// ['2018-04-30', '2018-05-01']

// Bad luck, the holiday is already on a weekend
console.log(bridgePublicHolidays(laborDay, 2021).map((d) => d.toString()));
// []
```
