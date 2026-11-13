---
title: "Using date and time formats in HTML (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/guides/date_and_time_formats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using date and time formats in HTML (part 2 of 2)

## Date issues

Because of data storage and precision issues, you may want to be aware of a few client-side and server-side issues.

### The Y2K38 Problem (often server-side)

JavaScript uses double precision floating points to store dates, as with all numbers, meaning that JavaScript code will not suffer from the Y2K38 problem unless integer coercion/bit-hacks are used because all JavaScript bit operators use 32-bit signed 2s-complement integers.

The problem is with the server side of things: storage of dates greater than 2^31 - 1. To fix this problem, you must store all dates using either unsigned 32-bit integers, signed 64-bit integers, or double-precision floating points on the server. If your server is written in PHP, the fix may require upgrading your PHP to a more recent version, and upgrading your hardware to x86_64 or IA64. If you are stuck with other hardware, you can try to emulate 64-bit hardware inside a 32-bit virtual machine, but most VMs don't support this kind of virtualization, since stability may suffer, and performance will definitely suffer greatly.

### The Y10k Problem (often client-side)

In many servers, dates are stored as numbers instead of as strings--numbers of a fixed size and agnostic of format (aside from endianness). After the year 10,000, those numbers will just be a bit bigger than before, so many servers will not see issues with forms submitted after the year 10,000.

The problem is with the client side of things: parsing of dates with more than 4 digits in the year.

```html
<!--midnight of January 1st, 10000: the exact time of Y10K-->
<input type="datetime-local" value="+010000-01-01T05:00" />
```

We need to prepare our code for any number of digits — not just 5. The following JavaScript function programmatically sets the value:

```js
function setValue(element, date) {
  const isoString = date.toISOString();
  element.value = isoString.substring(0, isoString.indexOf("T") + 6);
}
```

Why worry about the Y10K problem if it is going to happen many centuries after your death? Exactly because you will already be dead, so the companies using your software will be stuck using your software without any other coder who knows the system well enough to come in and fix it.

## See also

- ``
- `` and ``: see the `datetime` attribute, which specifies either a date or a local date and time at which the content was inserted or deleted
- The ISO 8601 specification
- Representing dates & times in the JavaScript Guide
- The JavaScript `Date` object
- The `Intl.DateTimeFormat` object for formatting dates and times for a given locale
