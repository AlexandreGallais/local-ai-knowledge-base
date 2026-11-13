---
title: "History: back() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/history/back/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# History: back() method

The **`back()`** method of the `History` interface causes
the browser to move back one page in the session history.

It has the same
effect as calling `history.go(-1)`. If there is no previous
page, this method call does nothing.

This method is asynchronous. Add a listener for the
`popstate` event in order to determine when the navigation has completed.

## Syntax

```js
back()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the associated document is not fully active. Browsers also throttle navigations and may throw this error, generate a warning, or ignore the call if it's called too frequently.

## Examples

The following short example causes a button on the page to navigate back one entry in
the session history.

### HTML

```html
<button id="go-back">Go back!</button>
```

### JavaScript

```js
document.getElementById("go-back").addEventListener("click", () => {
  history.back();
});
```

## See also

- `History`
- Working with the History API
