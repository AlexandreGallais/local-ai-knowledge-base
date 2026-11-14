---
title: "MediaQueryListEvent: matches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylistevent/matches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryListEvent: matches property

The **`matches`** read-only property of the
`MediaQueryListEvent` interface is a boolean value that is
`true` if the `document` currently matches the media query list,
or `false` if not.

## Value

A boolean value; returns `true` if the `document`
currently matches the media query list, `false` if not.

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
- `MediaQueryListEvent`
