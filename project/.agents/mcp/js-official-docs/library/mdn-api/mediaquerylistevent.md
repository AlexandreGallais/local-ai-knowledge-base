---
title: "MediaQueryListEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylistevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryListEvent

The `MediaQueryListEvent` object stores information on the changes that have happened to a `MediaQueryList` object — instances are available as the event object on a function referenced by a `change` event.

## Constructor

- `MediaQueryListEvent()`
    Creates a new `MediaQueryListEvent` instance.

## Instance properties

_The `MediaQueryListEvent` interface inherits properties from its parent interface, `Event`._

- `MediaQueryListEvent.matches` (read-only)
    A boolean value that is `true` if the `document` currently matches the media query list, or `false` if not.
- `MediaQueryListEvent.media` (read-only)
    A string representing a serialized media query.

## Instance methods

_The `MediaQueryListEvent` interface inherits methods from its parent interface, `Event`._

## Examples

```js
const para = document.querySelector("p"); // This is the UI element where to display the text
const mql = window.matchMedia("(width <= 600px)");

mql.addEventListener("change", (event) => {
  if (event.matches) {
    // The viewport is 600 pixels wide or less
    para.textContent = "This is a narrow screen — less than 600px wide.";
    document.body.style.backgroundColor = "red";
  } else {
    // The viewport is more than 600 pixels wide
    para.textContent = "This is a wide screen — more than 600px wide.";
    document.body.style.backgroundColor = "blue";
  }
});
```

## See also

- Media queries
- Using media queries from code
- `window.matchMedia()`
- `MediaQueryList`
