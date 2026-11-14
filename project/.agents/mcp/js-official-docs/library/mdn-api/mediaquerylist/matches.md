---
title: "MediaQueryList: matches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylist/matches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryList: matches property

The **`matches`** read-only property of the
`MediaQueryList` interface is a boolean value that returns
`true` if the `document` currently matches the media query list,
or `false` if not.

You can be notified when the value of `matches` changes by watching for the
`change` event to be fired at the
`MediaQueryList`.

## Value

A boolean value that is `true` if the `document`
currently matches the media query list; otherwise, it's `false`.

## Examples

This example detects viewport orientation changes by creating a media query using the
`@media/orientation` media
feature:

```js
const mql = window.matchMedia("(orientation:landscape)");
mql.addEventListener("change", (event) => {
  if (event.matches) {
    console.log("Now in landscape orientation");
  } else {
    console.log("Now in portrait orientation");
  }
});
```

## See also

- Media queries
- Using media queries from code
- `window.matchMedia()`
- `MediaQueryList`
- `MediaQueryListEvent`
