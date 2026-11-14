---
title: "Temporal cookbook (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/cookbook/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal cookbook (part 3 of 4)

## Arithmetic

### How many days until a future date

An example HTML form inspired by Days Calculator on timeanddate.com:

```html
<form>
  <label>
    Enter future date:
    <input type="date" name="futuredate" />
  </label>
  <button>Submit</button>
</form>

<div id="futuredate-results"></div>
```

```js
// Initialize the input; see 'Calendar input element'.
const futureDatePicker = document.querySelector('input[name="futuredate"]');
const today = Temporal.Now.plainDateISO();
futureDatePicker.min = today;
futureDatePicker.value = today.add({ months: 1 });

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const futuredateParam = futureDatePicker.value;
  if (!futuredateParam) return;

  const browserCalendar = new Intl.DateTimeFormat().resolvedOptions().calendar;
  const futureDate =
    Temporal.PlainDate.from(futuredateParam).withCalendar(browserCalendar);
  const today = Temporal.Now.plainDateISO().withCalendar(browserCalendar);
  const until = today.until(futureDate, { largestUnit: "day" });
  const untilMonths = until.round({ largestUnit: "month", relativeTo: today });

  const dayString = until.toLocaleString();
  const results = document.getElementById("futuredate-results");
  results.innerHTML = `
    <p>From and including: <strong>${today.toLocaleString()}</strong></p>
    <p>To but not including: <strong>${futureDate.toLocaleString()}</strong></p>
    <h4>Result: ${dayString}</h4>
    <p>It is ${dayString} from the start date to the end date, but not
    including the end date.</p>
    <p>Or ${untilMonths.toLocaleString()} excluding the end date.</p>
  `;
});
```

### Unit-constrained duration between now and a past/future zoned event

Take the difference between two `Temporal.Instant` instances as a `Temporal.Duration` instance (positive or negative), representing the duration between the two instants without using units coarser than specified (e.g., for presenting a meaningful countdown with vs. without using months or days).

```js
const result = Temporal.Instant.from("2020-01-09T04:00Z").since(
  Temporal.Instant.from("2020-01-09T00:00Z"),
  {
    largestUnit: "hour",
  },
);
console.log(`${result}`); // 'PT4H'

const result2 = Temporal.Instant.from("2020-01-09T00:00Z").until(
  Temporal.Instant.from("2020-01-09T04:00Z"),
  {
    largestUnit: "minute",
  },
);
console.log(`${result2}`); // 'PT240M'

// Example of using it in a countdown:

const duration = Temporal.Now.instant().until(
  Temporal.Instant.from("2020-04-01T13:00-07:00[America/Los_Angeles]"),
);
`It's ${duration.abs().toLocaleString()} ${duration.sign < 0 ? "since" : "until"} the TC39 Temporal presentation`;
```

### Next offset transition in a time zone

Map a `Temporal.ZonedDateTime` instance into another `Temporal.ZonedDateTime` instance representing the nearest following exact time at which there is an offset transition in the time zone (e.g., for setting reminders). The following function also takes an `inclusive` flag to include a transition at the starting instant, and returns `null` if no transition is known.

```js
function getNextOffsetTransitionFromExactTime(zonedDateTime, inclusive) {
  let nearest;
  if (inclusive) {
    // In case instant itself is the exact time of a transition:
    nearest = zonedDateTime
      .subtract({ nanoseconds: 1 })
      .getTimeZoneTransition("next");
  } else {
    nearest = zonedDateTime.getTimeZoneTransition("next");
  }
  return nearest;
}

const nycTime = Temporal.ZonedDateTime.from(
  "2019-04-16T21:01Z[America/New_York]",
);

const nextTransition = getNextOffsetTransitionFromExactTime(nycTime, false);
console.log(nextTransition.toString());
// '2019-11-03T01:00:00-05:00[America/New_York]'

// Inclusive
const sameTransition = getNextOffsetTransitionFromExactTime(
  nextTransition,
  true,
);
console.log(sameTransition.toString() === nextTransition.toString()); // true

// No known future DST transitions in a time zone
const reginaTime = Temporal.ZonedDateTime.from(
  "2019-04-16T21:01Z[America/Regina]",
);
console.log(getNextOffsetTransitionFromExactTime(reginaTime)); // null
```

### Comparison of an exact time to business hours

The following function takes a `Temporal.ZonedDateTime`, a weekly schedule, and a `Temporal.Duration` defining how soon is "soon". It returns "opening soon", "open", "closing soon", or "closed". The schedule is an array of seven entries, starting with Sunday; each entry is either `null` for a closed day or an object with `open` and `close` properties containing `Temporal.PlainTime` values.

```js
function getBusinessOpenStateText(now, businessHours, soonWindow) {
  const compare = Temporal.ZonedDateTime.compare;
  function inRange(zdt, start, end) {
    return compare(zdt, start) >= 0 && compare(zdt, end) < 0;
  }

  // Because of times wrapping around at midnight, we may need to consider
  // yesterday's and tomorrow's hours as well
  for (const delta of [-1, 0]) {
    const openDate = now.toPlainDate().add({ days: delta });
    // convert weekday (1..7) to 0-based index, for array:
    const index = (openDate.dayOfWeek + 7) % 7;
    if (!businessHours[index]) continue;

    const timeZone = now.timeZoneId;
    const { open: openTime, close: closeTime } = businessHours[index];
    const open = openDate.toZonedDateTime({ plainTime: openTime, timeZone });
    const isWrap = Temporal.PlainTime.compare(closeTime, openTime) < 0;
    const closeDate = isWrap ? openDate.add({ days: 1 }) : openDate;
    const close = closeDate.toZonedDateTime({ plainTime: closeTime, timeZone });

    if (inRange(now, open, close)) {
      return compare(now, close.subtract(soonWindow)) >= 0
        ? "closing soon"
        : "open";
    }
    if (inRange(now.add(soonWindow), open, close)) return "opening soon";
  }
  return "closed";
}

// For example, a restaurant or bar might have opening hours that go past
// midnight; make sure this is handled correctly
const businessHours = [
  /* Sun */ {
    open: Temporal.PlainTime.from("13:00"),
    close: Temporal.PlainTime.from("20:30"),
  },
  /* Mon */ null, // closed Mondays
  /* Tue */ {
    open: Temporal.PlainTime.from("11:00"),
    close: Temporal.PlainTime.from("20:30"),
  },
  /* Wed */ {
    open: Temporal.PlainTime.from("11:00"),
    close: Temporal.PlainTime.from("20:30"),
  },
  /* Thu */ {
    open: Temporal.PlainTime.from("11:00"),
    close: Temporal.PlainTime.from("22:00"),
  },
  /* Fri */ {
    open: Temporal.PlainTime.from("11:00"),
    close: Temporal.PlainTime.from("00:00"),
  },
  /* Sat */ {
    open: Temporal.PlainTime.from("11:00"),
    close: Temporal.PlainTime.from("02:00"),
  },
];

const now = Temporal.ZonedDateTime.from(
  "2019-04-07T00:00+02:00[Europe/Berlin]",
);
const soonWindow = Temporal.Duration.from({ minutes: 30 });
const saturdayNightState = getBusinessOpenStateText(
  now,
  businessHours,
  soonWindow,
);
console.log(saturdayNightState); // 'open'

const lastCall = now.add({ hours: 1, minutes: 50 });
console.log(lastCall.toString()); // '2019-04-07T01:50:00+02:00[Europe/Berlin]'
const lastCallState = getBusinessOpenStateText(
  lastCall,
  businessHours,
  soonWindow,
);
console.log(lastCallState); // 'closing soon'

const tuesdayEarly = now.add({ days: 2, hours: 6 });
const tuesdayEarlyState = getBusinessOpenStateText(
  tuesdayEarly,
  businessHours,
  soonWindow,
);
console.log(tuesdayEarlyState); // 'closed'
```

### Flight arrival/departure/duration

Map localized trip departure and arrival times into trip duration in units no larger than hours. (By default, differences between ZonedDateTime instances are exact differences in time units.)

```js
const departure = Temporal.ZonedDateTime.from(
  "2020-03-08T11:55:00+08:00[Asia/Hong_Kong]",
);
const arrival = Temporal.ZonedDateTime.from(
  "2020-03-08T09:50:00-07:00[America/Los_Angeles]",
);

const flightTime = departure.until(arrival);

console.log(flightTime.toString()); // 'PT12H55M'
```

Given a departure time with time zone and a flight duration, get an arrival time in the destination time zone, using time zone-aware math.

```js
const departure = Temporal.ZonedDateTime.from(
  "2020-03-08T11:55:00+08:00[Asia/Hong_Kong]",
);
const flightTime = Temporal.Duration.from({ minutes: 775 });

const arrival = departure.add(flightTime).withTimeZone("America/Los_Angeles");

console.log(arrival.toString());
// '2020-03-08T09:50:00-07:00[America/Los_Angeles]'
```

### Push back a launch date

The following function takes a `Temporal.PlainDate` and a number of days of delay (for example, the time it took to get an approval), and returns a `Temporal.PlainDate` for the start of the month following the delayed date.

```js
function plusAndRoundToMonthStart(date, delayDays) {
  return (
    date
      .add({ days: delayDays })
      .add({ months: 1 })
      // constrains to end of month if needed, e.g. Jan 31 -> Feb 28
      .with({ day: 1 })
  );
}

const oldLaunchDate = Temporal.PlainDate.from("2019-06-01");

const fifteenDaysDelay = plusAndRoundToMonthStart(oldLaunchDate, 15);
console.log(fifteenDaysDelay.toString()); // '2019-07-01'

const sixtyDaysDelay = plusAndRoundToMonthStart(oldLaunchDate, 60);
console.log(sixtyDaysDelay.toString()); // '2019-08-01'
```

### Schedule a reminder ahead of matching a record-setting duration

When considering a record (for example, a personal-best time in a sport), you might want to receive an alert just before the record is about to be broken. This example takes a record as a `Temporal.Duration`, the starting exact time of the current attempt as a `Temporal.Instant`, and another `Temporal.Duration` indicating how long before the potentially record-setting exact time you would like to receive an alert. It returns the exact time at which a notification could be sent, for example "Keep going! 5 more minutes and it will be your personal best!"

This could be used for workout tracking, racing (including _long_ and potentially time-zone-crossing races like the Bullrun Rally, Iditarod, Self-Transcendence 3100, and Clipper Round The World), or even open-ended analogs like event-every-day "streaks".

```js
function getInstantBeforeOldRecord(start, previousRecord, noticeWindow) {
  return start.add(previousRecord).subtract(noticeWindow);
}

// Start of the men's 10000 meters at the Rio de Janeiro 2016 Olympic Games
const raceStart = Temporal.Instant.from(
  "2016-08-13T21:27-03:00[America/Sao_Paulo]",
);
// Kenenisa Bekele's world record set in 2005
const record = Temporal.Duration.from({
  minutes: 26,
  seconds: 17,
  milliseconds: 530,
});
const noticeWindow = Temporal.Duration.from({ minutes: 1 });
// Time to send a "hurry up, can you finish the race in 1 minute?" push
// notification to all the runners
const reminderAt = getInstantBeforeOldRecord(raceStart, record, noticeWindow);

console.log(reminderAt.toString()); // '2016-08-14T00:52:17.53Z'
```

### Nth weekday of the month

The following function takes a `Temporal.PlainYearMonth` and returns a `Temporal.PlainDate` representing its first Tuesday, adaptable to other weekdays.

```js
function getFirstTuesday(queriedMonth) {
  // We first need to convert to a date
  const firstOfMonth = queriedMonth.toPlainDate({ day: 1 });

  // We have Monday = 1, Sunday = 7, and we want to add a positive number
  // smaller than 7 to get to the first Tuesday.
  // If we're already on a Tuesday (2) then we want to add 0.
  // So for the first of the month being a Monday through Sunday the additions are:
  //    1, 0, 6, 5, 4, 3, 2 which is given by that formula.
  // This lookup table makes this example easier to read, but you can also
  // calculate the answer: (7 + desiredWeekday - firstOfMonth.dayOfWeek) % 7
  return firstOfMonth.add({
    days: [1, 0, 6, 5, 4, 3, 2][firstOfMonth.dayOfWeek - 1],
  });
}

const myMonth = Temporal.PlainYearMonth.from("2020-02");
const firstTuesdayOfMonth = getFirstTuesday(myMonth);
console.log(firstTuesdayOfMonth.toString()); // '2020-02-04'
console.log(firstTuesdayOfMonth.dayOfWeek); // 2

// Similarly, to get the second Tuesday:
const secondWeek = myMonth.toPlainDate({ day: 8 });
const secondTuesday = secondWeek.add({
  days: [1, 0, 6, 5, 4, 3, 2][secondWeek.dayOfWeek - 1],
});
console.log(secondTuesday.day === firstTuesdayOfMonth.day + 7); // true

// And the last Tuesday:
const lastOfMonth = myMonth.toPlainDate({ day: myMonth.daysInMonth });
const lastTuesday = lastOfMonth.subtract({
  days: [6, 0, 1, 2, 3, 4, 5][lastOfMonth.dayOfWeek - 1],
});
console.log(lastTuesday.toString()); // '2020-02-25'
console.log(lastTuesday.dayOfWeek); // 2
// or:
const lastTuesday2 = lastOfMonth.subtract({
  days: (7 + lastOfMonth.dayOfWeek - 2) % 7,
});
console.log(Temporal.PlainDate.compare(lastTuesday, lastTuesday2)); // 0
```

The following function takes a `Temporal.PlainYearMonth` and a day of the week ranging from 1 (Monday) to 7 (Sunday), and returns a chronologically ordered array of `Temporal.PlainDate` instances for every matching day in the month.

```js
function getWeeklyDaysInMonth(yearMonth, dayNumberOfTheWeek) {
  const firstOfMonth = yearMonth.toPlainDate({ day: 1 });
  let nextWeekday = firstOfMonth.add({
    days: (7 + dayNumberOfTheWeek - firstOfMonth.dayOfWeek) % 7,
  });
  const result = [];
  while (nextWeekday.month === yearMonth.month) {
    result.push(nextWeekday);
    nextWeekday = nextWeekday.add({ days: 7 });
  }
  return result;
}

console.log(
  getWeeklyDaysInMonth(Temporal.PlainYearMonth.from("2020-02"), 1).join(" "),
); // '2020-02-03 2020-02-10 2020-02-17 2020-02-24'
console.log(
  getWeeklyDaysInMonth(Temporal.PlainYearMonth.from("2020-02"), 6).join(" "),
); // '2020-02-01 2020-02-08 2020-02-15 2020-02-22 2020-02-29'
```

The following function takes a `Temporal.PlainDate` and returns the count of preceding days in its month that share its day of the week.

```js
function countPrecedingWeeklyDaysInMonth(date) {
  // This doesn't actually require Temporal
  return Math.floor((date.day - 1) / 7);
}

console.log(
  countPrecedingWeeklyDaysInMonth(Temporal.PlainDate.from("2020-02-28")),
); // 3
console.log(
  countPrecedingWeeklyDaysInMonth(Temporal.PlainDate.from("2020-02-29")),
); // 4
```

### Manipulating the day of the month

Here are some examples of taking an existing date, and adjusting the day of the month.

```js
const date = Temporal.PlainDate.from("2020-04-14");

// Third day of next month:

const thirdOfNextMonth = date.add({ months: 1 }).with({ day: 3 });

console.log(thirdOfNextMonth.toString()); // '2020-05-03'

// Last day of this month:

const lastOfThisMonth = date.with({ day: date.daysInMonth });

console.log(lastOfThisMonth.toString()); // '2020-04-30'

// On the 18th of this month at 8 PM:

const thisMonth18thAt8PM = date
  .with({ day: 18 })
  .toPlainDateTime(Temporal.PlainTime.from("20:00"));

console.log(thisMonth18thAt8PM.toString()); // '2020-04-18T20:00:00'
```
