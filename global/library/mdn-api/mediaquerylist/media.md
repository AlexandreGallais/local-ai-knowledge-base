---
title: "MediaQueryList: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylist/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryList: media property

The **`media`** read-only property of the
`MediaQueryList` interface is a string representing a
serialized media query.

## Value

A string representing a serialized media query.

## Examples

This example runs the media query `(width <= 600px)` and displays the
value of the resulting `MediaQueryList`'s `media` property in a
``.

### HTML

```html
<span class="mq-value"></span>
```

A `` to receive the output.

```css
.mq-value {
  font:
    18px "Arial",
    sans-serif;
  font-weight: bold;
  color: #8888ff;
  padding: 0.4em;
  border: 1px solid #ddddee;
}
```

### JavaScript

```js
let mql = window.matchMedia("(width <= 600px)");

document.querySelector(".mq-value").innerText = mql.media;
```

The JavaScript code passes the media query to match into `matchMedia()` to compile it, then sets the ``'s
`innerText` to the value of the result's
`media` property.

## See also

- Media queries
- Using media queries from code
- `window.matchMedia()`
- `MediaQueryList`
- `MediaQueryListEvent`
