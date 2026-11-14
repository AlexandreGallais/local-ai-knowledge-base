---
title: "MediaQueryList: removeListener() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaquerylist/removelistener/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaQueryList: removeListener() method

The **`removeListener()`** method of the
`MediaQueryList` interface removes a listener from the
`MediaQueryListener`.

In older browsers `MediaQueryList` did not yet inherit from `EventTarget`,
so this method was provided as an alias of `EventTarget.removeEventListener()`.
Use `removeEventListener()` instead of `removeListener()` if it is
available in the browsers you need to support.

## Syntax

```js
removeListener(func)
```

### Parameters

- `func`
    A function or function reference representing the callback function you want to
    remove.

### Return value

None (`undefined`).

## Examples

```js
const paragraph = document.querySelector("p");
const mediaQueryList = window.matchMedia("(width <= 600px)");

function screenTest(e) {
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    paragraph.textContent = "This is a narrow screen — 600px wide or less.";
    document.body.style.backgroundColor = "pink";
  } else {
    /* the viewport is more than 600 pixels wide */
    paragraph.textContent = "This is a wide screen — more than 600px wide.";
    document.body.style.backgroundColor = "aquamarine";
  }
}

mediaQueryList.addListener(screenTest);

// Later on, when it is no longer needed
mediaQueryList.removeListener(screenTest);
```

## See also

- Media queries
- Using media queries from code
- `window.matchMedia()`
- `MediaQueryList`
- `MediaQueryListEvent`
