---
title: "Temporal.PlainDate.prototype.calendarId"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/calendarid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.calendarId

The **`calendarId`** accessor property of `Temporal.PlainDate` instances returns a string representing the calendar used to interpret the internal ISO 8601 date.

See `Intl.supportedValuesOf()` for a list of commonly supported calendar types.

The set accessor of `calendarId` is `undefined`. You cannot change this property directly. Use the `withCalendar()` method to create a new `Temporal.PlainDate` object with the desired new value.

## Examples

### Using calendarId

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.calendarId); // "iso8601"; default

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
console.log(date2.calendarId); // "chinese"

const date3 = date2.withCalendar("hebrew");
console.log(date3.calendarId); // "hebrew"
```

## See also

- `Temporal.PlainDate`
