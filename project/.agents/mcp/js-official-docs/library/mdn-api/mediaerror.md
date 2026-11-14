---
title: "MediaError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaError

The **`MediaError`** interface represents an error which occurred while handling media in an HTML media element based on `HTMLMediaElement`, such as `<audio>` or ``.

A `MediaError` object describes the error in general terms using a numeric `code` categorizing the kind of error, and a `message`, which provides specific diagnostics about what went wrong.

## Instance properties

_This interface doesn't inherit any properties._

- `MediaError.code` (read-only)
    A number which represents the general type of error that occurred.
- `MediaError.message` (read-only)
    A human-readable string which provides _specific diagnostic information_ to help the reader understand the error condition which occurred; specifically, it isn't a summary of what the error code means, but actual diagnostic information to help in understanding what exactly went wrong. This text and its format is not defined by the specification and will vary from one user agent to another. If no diagnostics are available, or no explanation can be provided, this value is an empty string (`""`).

## Instance methods

_This interface doesn't implement or inherit any methods, and has none of its own._

## See also

- `HTMLMediaElement.error`
