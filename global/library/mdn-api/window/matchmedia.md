---
title: "Window: matchMedia() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/matchmedia/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: matchMedia() method

The `Window` interface's **`matchMedia()`** method
returns a new `MediaQueryList` object that can then be used to determine if
the `document` matches the media query string,
as well as to monitor the document to detect when it matches (or stops matching) that
media query.

## Syntax

```js
matchMedia(mediaQueryString)
```

### Parameters

- `mediaQueryString`
    A string specifying the media query to parse into a `MediaQueryList`.

    Just like in CSS, any media feature must be wrapped in parentheses inside the expression. For example: `matchMedia("(width <= 600px)")` or `matchMedia("(orientation: landscape)")` work, whereas `matchMedia("width < 600px")` or `matchMedia("orientation: landscape")` do not. Keywords for media types (`all`, `print`, `screen`) and logical operators (`and`, `or`, `not`, `only`) do not need to be wrapped in parentheses.

### Return value

A new `MediaQueryList` object for the media query. Use this object's
properties and events to detect matches and to monitor for changes to those matches over
time.

## Usage notes

You can use the returned media query to perform both instantaneous and event-driven
checks to see if the document matches the media query.

To perform a one-time, instantaneous check to see if the document matches the media
query, look at the value of the `matches`
property, which will be `true` if the document meets the media query's
requirements.

If you need to be kept aware of whether or not the document matches the media query at
all times, you can instead watch for the `change` event to be delivered to the object.
There's a good example of this
in the article on `Window.devicePixelRatio`.

## Examples

This example runs the media query `(width <= 600px)` and displays the
value of the resulting `MediaQueryList`'s `matches` property in a
``; as a result, the output will say "true" if the viewport is less
than or equal to 600 pixels wide, and will say "false" if the window is wider than that.

### HTML

```html
<span class="mq-value"></span>
```

A simple `` to receive the output.

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

document.querySelector(".mq-value").innerText = mql.matches;
```

The JavaScript code passes the media query to match into `matchMedia()` to compile it, then sets the ``'s `innerText` to the value of the results' `matches` property, so that it indicates whether or not the document matches the media query at the moment the page was loaded.

### Result

See Testing media queries programmatically for additional code examples.

## See also

- Media queries
- Using media queries from code
- `MediaQueryList`
