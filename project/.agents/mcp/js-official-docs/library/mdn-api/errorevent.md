---
title: "ErrorEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent

The **`ErrorEvent`** interface represents events providing information related to errors in scripts or in files.

## Constructor

- `ErrorEvent()`
    Creates an `ErrorEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `ErrorEvent.message` (read-only)
    A string containing a human-readable error message describing the problem.
- `ErrorEvent.filename` (read-only)
    A string containing the name of the script file in which the error occurred.
- `ErrorEvent.lineno` (read-only)
    An integer containing the line number of the script file on which the error occurred.
- `ErrorEvent.colno` (read-only)
    An integer containing the column number of the script file on which the error occurred.
- `ErrorEvent.error` (read-only)
    A JavaScript value, such as an `Error` or `DOMException`, representing the error associated with this event.

## Instance methods

_Inherits methods from its parent `Event`_.

## See also

- Using web workers, most likely objects to raise such an event.
- `Window`: `error` event
- `Navigation`: `navigateerror` event
