---
title: "MediaQueryListEvent: MediaQueryListEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylistevent/mediaquerylistevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryListEvent: MediaQueryListEvent() constructor

The **`MediaQueryListEvent()`** constructor creates a new `MediaQueryListEvent` object.

## Syntax

```js
new MediaQueryListEvent(type)
new MediaQueryListEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `change`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `media` (optional)
        A string representing a serialized media query. It defaults to `""`.
    - `matches` (optional)
        A boolean value representing the media query status; `true` if it matches, `false` if not. It defaults to `false`.

### Return value

A new `MediaQueryListEvent` object.

## Examples

```js
const media = "(width <= 600px)";
const matches = true;

const myMediaQueryListEvent = new MediaQueryListEvent("change", {
  media,
  matches,
});
```

## See also

- Media queries
- Using media queries from code
- `window.matchMedia()`
- `MediaQueryList`
- `MediaQueryListEvent`
