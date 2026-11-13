---
title: "Representing dates & times (part 1 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/representing_dates_times/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Representing dates & times

Dates and times are everywhere in web applications. Want to calculate how long since the last scheduled payment? Want to set a reminder for "next Tuesday, 1 pm" or "My friend's birthday"? Want to display the time when each file was created? This guide explains the details behind handling dates and times in JavaScript, and gives you a gentle introduction to the gigantic `Temporal` API.

This guide introduces the API methods and properties and explains date mechanisms, especially calendars and time zones. If you are only interested in snippets for common use cases, see our Temporal cookbook.

## Instants

Most date-times identify a unique moment in time in the past, present, or future. Consider these examples:

- The first commit to mdn/content was made on **September 15, 2020 at 11:43:01 EDT** (the commit author was in the US Eastern time zone)
- The Fall of the Bastille happened in Paris on **July 14, 1789**
- You may need to perform some maintenance to your app, so you tell your user that the app will be unavailable on **November 13, 2026 from 05:00 UTC to 07:00 UTC** (this is a "future date" at the time this doc was written; it may no longer be in the future when you are reading it!)

There's immediately one problem: we rarely know the _precise time_ of anything! Git commit timestamps only store the seconds, so we don't know the nanoseconds, or even milliseconds, of when this event occurred. Similarly, historic dates like July 14, 1789 rarely have specific times at all (and eventually we need to ask nonsensical questions like "Did the Bastille fall when the first defender walked out or the last?"). We can address this with some sensible defaults. For example, we can set all milliseconds and nanoseconds to 0, and assume that the Bastille fell at 17:00:00 UTC.

> **Note:**
> These approximations are akin to how you approximate a country's population to the nearest million, a person's age to a whole number of years, etc.—as long as they preserve the behavior and meaning that your users care about (for example, "Sort by date" can work correctly, or "x days ago" displays the correct number), it won't be a problem.

Anyway, such defaults enable us to define a precise **instant** in history, accurate to the nanosecond level (clocks can rarely measure more precisely than that). We can represent it as a single number: an offset from an agreed-upon instant, called the _epoch_. JavaScript—which follows the same Unix convention as many other pieces of software—uses the epoch **January 1, 1970, 00:00:00 UTC**. For example, we can construct an instant using a `Temporal.Instant` object that's `1600184581000000000` nanoseconds (note: this is equivalent to 18520 days, 15 hours, 43 minutes, and 1 second) after the epoch, and then display that time in the US Eastern time zone (see Internationalization to understand more about date-time formatting):

```js
const specialInstant = new Temporal.Instant(1600184581000000000n);

console.log(
  specialInstant.toLocaleString("en-US", { timeZone: "America/New_York" }),
);
// 9/15/2020, 11:43:01 AM
```

As you can see, the `specialInstant` now represents the aforementioned **September 15, 2020 at 11:43:01 EDT** instant.

Similarly, we can construct an instant that's `5694908400000000000` nanoseconds (note: this is equivalent to 65913 days and 7 hours) _before_ the epoch by using a negative number. When displayed in the Paris time zone, this happens to be **July 14, 1789**, at some odd time (see Understanding the time zone for why it's 9 minutes and 21 seconds past the hour).

```js
const specialInstant = new Temporal.Instant(-5694908400000000000n);

console.log(
  specialInstant.toLocaleString("en-US", { timeZone: "Europe/Paris" }),
);
// 7/14/1789, 5:09:21 PM
```

The `Temporal.Instant` object stores the nanosecond offset, which you can retrieve with `epochNanoseconds`. You can also use `epochMilliseconds` to get the same offset in milliseconds (which is nanoseconds divided by a million and floored to an integer). Representing instants as single numbers is very convenient for the computer—storing, computing differences, and comparing instants are all straightforward. Git, databases, JavaScript's `Date` object, and most software use similar approaches.

Instants can be added/subtracted, compared, serialized, and displayed (see Deriving new times), but importantly, they do not give you information like "what time of day it is" or "what date it is". Calculating such nuances requires additional metadata, which we'll look at next.
