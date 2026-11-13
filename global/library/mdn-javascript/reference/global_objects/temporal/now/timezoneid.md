---
title: "Temporal.Now.timeZoneId()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/timezoneid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now.timeZoneId()

The **`Temporal.Now.timeZoneId()`** static method returns a time zone identifier representing the system's current time zone. Most systems will return a primary time zone identifier such as `"America/New_York"`, though offset time zone identifier such as `"-04:00"` is possible too. The time zone identifier returned is the default time zone used by the other `Temporal.Now` methods.

## Syntax

```js
Temporal.Now.timeZoneId()
```

### Parameters

None.

### Return value

A valid time zone identifier representing the system's current time zone. The returned time zone identifier is never a non-primary time zone identifier (alias). For example, it would always return `"Asia/Kolkata"` (new name) instead of `"Asia/Calcutta"` (old name). For more information, see time zones and offsets.

If the implementation does not support time zones, the method always returns `"UTC"`.

## Examples

### Getting the system's current time zone

```js
console.log(Temporal.Now.timeZoneId()); // e.g.: "America/New_York"
```

## See also

- `Temporal.Now`
