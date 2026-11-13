---
title: "History: forward() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/history/forward/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# History: forward() method

The **`forward()`** method of the `History` interface causes the browser to move
forward one page in the session history. It has the same effect as calling
`history.go(1)`.

This method is asynchronous. Add a listener for the `popstate` event in order to determine when the navigation has completed.

## Syntax

```js
forward()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the associated document is not fully active. Browsers also throttle navigations and may throw this error, generate a warning, or ignore the call if it's called too frequently.

## Examples

The following examples create a button that moves forward one step in the session
history.

### HTML

```html
<button id="go-forward">Go Forward!</button>
```

### JavaScript

```js
document.getElementById("go-forward").addEventListener("click", (e) => {
  history.forward();
});
```

## See also

- `History`
- `popstate`
- Working with the History API
