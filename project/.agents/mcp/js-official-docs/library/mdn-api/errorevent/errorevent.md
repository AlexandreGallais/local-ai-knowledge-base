---
title: "ErrorEvent: ErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/errorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent: ErrorEvent() constructor

The **`ErrorEvent()`** constructor creates a new `ErrorEvent` object.

## Syntax

```js
new ErrorEvent(type)
new ErrorEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event. It is case-sensitive.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `message` (optional)
        A string containing a human-readable error message describing the problem.
    - `filename` (optional)
        A string containing the name of the script file in which the error occurred.
    - `lineno` (optional)
        An integer containing the line number of the script file on which the error occurred.
    - `colno` (optional)
        An integer containing the column number of the script file on which the error occurred.
    - `error` (optional)
        A JavaScript value, such as an `Error` or `DOMException`, representing the error associated with this event.

### Return value

A new `ErrorEvent` object.
