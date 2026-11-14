---
title: "Location: replace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/replace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: replace() method

The **`replace()`** method of the `Location`
interface replaces the current resource with the one at the provided URL. The difference
from the `assign()` method is that after using
`replace()` the current page will not be saved in session `History`,
meaning the user won't be able to use the _back_ button to navigate to it.
Not to be confused with the `String` method `String.prototype.replace()`.

## Syntax

```js
replace(url)
```

### Parameters

- `url`
    A string or any other object with a stringifier, such as a `URL` object, containing the URL of the page to navigate to.

### Exceptions

- `SecurityError` `DOMException`
    Browsers throttle navigations and may throw this error, generate a warning, or ignore the call if it's called too frequently.
- `SyntaxError` `DOMException`
    Thrown if the provided `url` parameter is not a valid URL.

### Return value

None (`undefined`).

## Examples

```js
// Navigate to the Location.reload article by replacing this page
window.location.replace(
  "https://developer.mozilla.org/en-US/docs/Web/API/Location.reload",
);
```

## See also

- The `Location` interface it belongs to.
- Similar methods: `Location.assign()` and
  `Location.reload()`.
