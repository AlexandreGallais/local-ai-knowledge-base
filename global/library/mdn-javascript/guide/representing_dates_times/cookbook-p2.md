---
title: "Temporal cookbook (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/cookbook/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal cookbook (part 2 of 4)

## Time zone conversion

### Preserving local time

Map a zoneless date and time of day into a `Temporal.Instant` instance at which the local date and time of day in a specified time zone matches it. This is easily done with <code>dateTime.toZonedDateTime(timeZone).toInstant()</code>, but here is an example of implementing different disambiguation behaviors than the `"compatible"`, `"earlier"`, `"later"`, and `"reject"` ones built in to `Temporal`. The following function takes a `Temporal.PlainDateTime`, a time zone identifier, and a disambiguation mode (defaulting to `"earlier"`). It returns a `Temporal.Instant` and supports two additional modes:

- `"clipEarlier"`: Uses the earlier instant when the clock moves backward, or the instant just before the transition when the clock moves forward.
- `"clipLater"`: Uses the later instant when the clock moves backward, or the instant of the transition when the clock moves forward.

```js
function getInstantWithLocalTimeInZone(
  dateTime,
  timeZone,
  disambiguation = "earlier",
) {
  // Handle the built-in modes first
  if (["compatible", "earlier", "later", "reject"].includes(disambiguation)) {
    return dateTime.toZonedDateTime(timeZone, { disambiguation }).toInstant();
  }

  const possibilities = ["earlier", "later"].map((disambiguation) =>
    dateTime.toZonedDateTime(timeZone, { disambiguation }),
  );
  const instants = possibilities
    .map((zdt) => zdt.toInstant())
    .reduce((a, b) => (a.equals(b) ? [a] : [a, b]));

  // Return only possibility if no disambiguation needed
  if (instants.length === 1) return instants[0];

  switch (disambiguation) {
    case "clipEarlier":
      if (possibilities[0].toPlainDateTime().equals(dateTime)) {
        return instants[0];
      }
      return possibilities[0]
        .getTimeZoneTransition("next")
        .subtract({ nanoseconds: 1 })
        .toInstant();
    case "clipLater":
      if (possibilities[1].toPlainDateTime().equals(dateTime)) {
        return instants[1];
      }
      return possibilities[0].getTimeZoneTransition("next").toInstant();
  }
  throw new RangeError(`invalid disambiguation ${disambiguation}`);
}

const nonexistentGermanWallTime =
  Temporal.PlainDateTime.from("2019-03-31T02:45");

const germanResults = {
  earlier: "2019-03-31T01:45:00+01:00",
  later: "2019-03-31T03:45:00+02:00",
  compatible: "2019-03-31T03:45:00+02:00",
  clipEarlier: "2019-03-31T01:59:59.999999999+01:00",
  clipLater: "2019-03-31T03:00:00+02:00",
};
for (const [disambiguation, result] of Object.entries(germanResults)) {
  console.log(
    getInstantWithLocalTimeInZone(
      nonexistentGermanWallTime,
      "Europe/Berlin",
      disambiguation,
    ).toString({
      timeZone: "Europe/Berlin",
    }) === result,
  ); // true
}

const doubleEasternBrazilianWallTime =
  Temporal.PlainDateTime.from("2019-02-16T23:45");

const brazilianResults = {
  earlier: "2019-02-16T23:45:00-02:00",
  later: "2019-02-16T23:45:00-03:00",
  compatible: "2019-02-16T23:45:00-02:00",
  clipEarlier: "2019-02-16T23:45:00-02:00",
  clipLater: "2019-02-16T23:45:00-03:00",
};
for (const [disambiguation, result] of Object.entries(brazilianResults)) {
  console.log(
    getInstantWithLocalTimeInZone(
      doubleEasternBrazilianWallTime,
      "America/Sao_Paulo",
      disambiguation,
    ).toString({
      timeZone: "America/Sao_Paulo",
    }) === result,
  ); // true
}
```

### Preserving exact time

Map a zoned date and time of day into another zoned date and time of day in a target time zone at the corresponding exact time. This could be used when converting user-input date-time values between time zones.

```js
const source = Temporal.ZonedDateTime.from("2020-01-09T00:00[America/Chicago]");

const result = source.withTimeZone("America/Los_Angeles");

// On this date, when it's midnight in Chicago, it's 10 PM the previous night in LA
console.log(result.toString());
// '2020-01-08T22:00:00-08:00[America/Los_Angeles]'
```

Here is another example similar to the previous one, using the time zone for future events. The times and locations of a series of future meetings are stored as a pair of strings: one for the calendar date and wall-clock time, and one for the time zone. They cannot be stored as an exact time because between now and the time when the event happens, the time zone rules for daylight saving time could change — for example, Brazil abolished daylight saving time in 2019 — but the meeting would still be held at the same wall-clock time on that date. So if the time zone rules changed, the event's exact time would change.

This example calculates the starting times of all the Ecma TC39 meetings in 2019, in local time in Tokyo.

```js
// Dates of the 2019 TC39 meetings:
const tc39meetings = [
  {
    dateTime: "2019-01-28T10:00",
    timeZone: "America/Phoenix",
  },
  {
    dateTime: "2019-03-26T10:00",
    timeZone: "America/New_York",
  },
  {
    dateTime: "2019-06-04T10:00",
    timeZone: "Europe/Berlin",
  },
  {
    dateTime: "2019-07-23T10:00",
    timeZone: "America/Los_Angeles",
  },
  {
    dateTime: "2019-10-01T10:00",
    timeZone: "America/New_York",
  },
  {
    dateTime: "2019-12-03T10:00",
    timeZone: "America/Los_Angeles",
  },
];

// To follow the meetings remotely from Tokyo, calculate the times you would
// need to join:
const localTimeZone = "Asia/Tokyo";
const localTimes = tc39meetings.map(({ dateTime, timeZone }) => {
  return Temporal.PlainDateTime.from(dateTime)
    .toZonedDateTime(timeZone, { disambiguation: "reject" })
    .withTimeZone(localTimeZone)
    .toPlainDateTime();
});

console.log(localTimes.map((dt) => dt.toString()));
// [
//   "2019-01-29T02:00:00",
//   "2019-03-26T23:00:00",
//   "2019-06-04T17:00:00",
//   "2019-07-24T02:00:00",
//   "2019-10-01T23:00:00",
//   "2019-12-04T03:00:00",
// ]
```

### Daily occurrence in local time

Similar to the previous recipe, calculate the exact times of a daily occurrence that happens at a particular local time in a particular time zone. The following generator takes a starting `Temporal.PlainDate`, a `Temporal.PlainTime`, and a time zone identifier, and yields each occurrence as a `Temporal.Instant`.

```js
function* calculateDailyOccurrence(startDate, plainTime, timeZone) {
  for (let date = startDate; ; date = date.add({ days: 1 })) {
    yield date.toZonedDateTime({ plainTime, timeZone }).toInstant();
  }
}

// Daily meeting at 8 AM California time
const startDate = Temporal.PlainDate.from("2017-03-10");
const time = Temporal.PlainTime.from("08:00");
const timeZone = "America/Los_Angeles";
const iter = calculateDailyOccurrence(startDate, time, timeZone);

console.log(iter.next().value.toString()); // '2017-03-10T16:00:00Z'
console.log(iter.next().value.toString()); // '2017-03-11T16:00:00Z'
// DST change:
console.log(iter.next().value.toString()); // '2017-03-12T15:00:00Z'
console.log(iter.next().value.toString()); // '2017-03-13T15:00:00Z'
```

### UTC offset for a zoned event, as a string

Use `Temporal.Instant.prototype.toZonedDateTimeISO()` and `offset` to map a `Temporal.Instant` instance and a time zone into the UTC offset at that exact time in that time zone, as a string.

```js
const instant = Temporal.Instant.from("2020-01-09T00:00Z");

const source = instant.toZonedDateTimeISO("America/New_York");
source.offset; // '-05:00'
```

### UTC offset for a zoned event, as a number of seconds

Similarly, use `Temporal.Instant.prototype.toZonedDateTimeISO()` and `offsetNanoseconds` to do the same thing for the offset as a number of seconds. (Remember to divide by 109 to convert nanoseconds to seconds.)

```js
const instant = Temporal.Instant.from("2020-01-09T00:00Z");

instant.toZonedDateTimeISO("America/New_York").offsetNanoseconds / 1e9;
// -18000
```

### Offset between two time zones at an exact time

Also using `Temporal.Instant.prototype.toZonedDateTimeISO()` and `Temporal.ZonedDateTime.offsetNanoseconds`, we can map a `Temporal.Instant` instance and two time zones into the signed difference of UTC offsets between those time zones at that exact time, as a number of seconds.

```js
function getUtcOffsetDifferenceSecondsAtInstant(
  instant,
  sourceTimeZone,
  targetTimeZone,
) {
  const sourceOffsetNs =
    instant.toZonedDateTimeISO(sourceTimeZone).offsetNanoseconds;
  const targetOffsetNs =
    instant.toZonedDateTimeISO(targetTimeZone).offsetNanoseconds;
  return (targetOffsetNs - sourceOffsetNs) / 1e9;
}

const instant = Temporal.Instant.from("2020-01-09T00:00Z");

// At this exact time, Chicago is 3600 seconds earlier than New York
console.log(
  getUtcOffsetDifferenceSecondsAtInstant(
    instant,
    "America/New_York",
    "America/Chicago",
  ),
); // -3600
```

### Dealing with dates and times in a fixed location

Here is an example of `Temporal` used in a graph, showing fictitious activity for a storage tank in a fixed location (Stockholm, Sweden). The graph always starts at midnight in the tank's location, but the graph labels are in the viewer's time zone.

```html
<script src="https://cdn.jsdelivr.net/npm/user@example.com/dist/Chart.min.js"></script>
<canvas id="storage-tank" width="600" height="400"></canvas>
```

```js
// Generate fictitious "data"
const start = Temporal.Now.instant().subtract({ hours: 24 });
const blank = Array(24 * 12);
const tankDataX = Array.from(blank, (_, ix) => start.add({ minutes: ix * 5 }));
const tankDataY = Array.from(blank);
tankDataY[0] = 25;
for (let ix = 1; ix < tankDataY.length; ix++) {
  tankDataY[ix] = Math.max(0, tankDataY[ix - 1] + 3 * (Math.random() - 0.5));
}

// tankDataX and tankDataY are X and Y-axis data for the last 24 hours,
// obtained from elsewhere, e.g. const [tankDataX, tankDataY] = fetchData();
// tankDataX is an array of Temporal.Instant, and tankDataY is an array of numbers.

// Show data starting from the most recent midnight in the tank's location (Stockholm)
const tankTimeZone = "Europe/Stockholm";
const labelFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  timeZone: Temporal.Now.timeZoneId(),
});
const browserCalendar = labelFormatter.resolvedOptions().calendar;
const tankMidnight = Temporal.Now.zonedDateTimeISO()
  .withCalendar(browserCalendar)
  .withTimeZone(tankTimeZone)
  .startOfDay()
  .toInstant();
const atOrAfterMidnight = (x) => Temporal.Instant.compare(x, tankMidnight) >= 0;
const dataStartIndex = tankDataX.findIndex(atOrAfterMidnight);
const graphLabels = tankDataX
  .slice(dataStartIndex)
  .map((x) => labelFormatter.format(x));
const graphPoints = tankDataY.slice(dataStartIndex);

const ctx = document.getElementById("storage-tank").getContext("2d");
// The graph is made with Chart.js (https://www.chartjs.org/)
new Chart(ctx, {
  type: "line",
  data: {
    labels: graphLabels,
    datasets: [
      {
        label: "Fill level",
        data: graphPoints,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Stockholm storage tank",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
```

### Book a meeting across time zones

Across the web there are several tools for finding meeting times that are appropriate for all the participants' time zones, such as World Time Buddy, World Clock Meeting Planner, and built into various calendar software.

```css
#meeting-planner {
  border-collapse: separate;
  border-spacing: 0 10px;
  font-size: 0.6rem;
  text-align: center;
}

/* https://materializecss.com/color.html */
.time-0,
.time-1,
.time-2,
.time-3,
.time-4,
.time-5,
.time-22,
.time-23 {
  background-color: #ef9a9a; /* red lighten-3 */
  border-color: #e57373; /* red lighten-2 */
  border-style: solid;
  border-width: 0 1px;
}
.time-6,
.time-7,
.time-18,
.time-19,
.time-20,
.time-21 {
  background-color: #fff59d; /* yellow lighten-3 */
  border-color: #ffd54f; /* amber lighten-2 */
  border-style: solid;
  border-width: 0 1px;
}
.time-8,
.time-9,
.time-10,
.time-11,
.time-12,
.time-13,
.time-14,
.time-15,
.time-16,
.time-17 {
  background-color: #a5d6a7; /* green lighten-3 */
  border-color: #81c784; /* green lighten-2 */
  border-style: solid;
  border-width: 0 1px;
}

.time-0 {
  border-bottom-left-radius: 12px;
  border-left-color: white;
  border-left-width: 2px;
  border-top-left-radius: 12px;
  font-weight: bold;
}
.time-23 {
  border-bottom-right-radius: 12px;
  border-right-color: white;
  border-right-width: 2px;
  border-top-right-radius: 12px;
}

.time-current {
  border: 2px solid black;
}
```

```html
<table id="meeting-planner"></table>
```

```js
// Display local time zone and three others
const browserCalendar = new Intl.DateTimeFormat().resolvedOptions().calendar;
const now = Temporal.Now.zonedDateTimeISO().withCalendar(browserCalendar);
const timeZones = [
  { name: "Here", tz: now.timeZoneId },
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
];

// Start the table at midnight local time
const startTime = now.startOfDay();

// Build the table
const table = document.getElementById("meeting-planner");
timeZones.forEach(({ name, tz }) => {
  const row = document.createElement("tr");

  const title = document.createElement("td");
  const startTimeHere = startTime.withTimeZone(tz);
  title.textContent = `${name} (UTC${startTimeHere.offset})`;
  row.appendChild(title);

  for (let hours = 0; hours < 24; hours++) {
    const cell = document.createElement("td");

    const columnTime = startTimeHere.add({ hours });
    cell.className = `time-${columnTime.hour}`;

    // Highlight the current hour in each row
    if (hours === now.hour) cell.className += " time-current";

    // Show the date in midnight cells
    let formatOptions;
    if (columnTime.hour === columnTime.startOfDay().hour) {
      formatOptions = { month: "short", day: "numeric" };
    } else {
      formatOptions = { hour: "numeric" };
    }
    cell.textContent = columnTime.toLocaleString(undefined, formatOptions);
    row.appendChild(cell);
  }

  table.appendChild(row);
});
```
