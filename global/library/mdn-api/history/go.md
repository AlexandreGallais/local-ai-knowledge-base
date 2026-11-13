---
title: "History: go() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/history/go/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# History: go() method

The **`go()`** method of the `History` interface loads a specific page from the
session history. You can use it to move forwards and backwards through the history
depending on the value of a parameter.

This method is asynchronous. Add a listener for the
`popstate` event in order to determine when the navigation has completed.

## Syntax

```js
go()
go(delta)
```

### Parameters

- `delta` (optional)
    The position in the history to which you want to move, relative to the current page.
    A negative value moves backwards, a positive value moves forwards. So, for example,
    `history.go(2)` moves forward two pages and `history.go(-2)`
    moves back two pages. If no value is passed or if `delta` equals 0, it has
    the same result as calling `location.reload()`.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the associated document is not fully active. Browsers also throttle navigations and may throw this error, generate a warning, or ignore the call if it's called too frequently.

## Examples

To move back one page (the equivalent of calling `back()`):

```js
history.go(-1);
```

To move forward a page, just like calling `forward()`:

```js
history.go(1);
```

To move forward two pages:

```js
history.go(2);
```

To move backwards by two pages:

```js
history.go(-2);
```

And finally, either of the following statements will reload the current page:

```js
history.go();
history.go(0);
```

## See also

- `History`
- `back()`
- `forward()`
- `popstate` event
- Working with the History API
