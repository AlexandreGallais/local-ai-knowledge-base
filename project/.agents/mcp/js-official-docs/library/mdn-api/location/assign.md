---
title: "Location: assign() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/assign/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: assign() method

The **`assign()`** method of the `Location`
interface causes the window to load
and display the document at the URL specified. After the navigation occurs, the user can
navigate back to the page that called `Location.assign()` by pressing the "back" button.

## Syntax

```js
assign(url)
```

### Parameters

- `url`
    A string or any other object with a stringifier, such as a `URL` object, containing the URL of the page to navigate to; for example, an absolute URL such as `https://developer.mozilla.org/en-US/docs/Web/API/Location/reload`, or a relative URL — such as `/Web` (just a path, for navigating to another document at the same origin) or `#specifications` (just a fragment string, for navigating to some part of the same page), and so on.

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the origin of the script calling the method is not the same origin of the page originally described by the `Location` object, mostly when the script is hosted on a different domain. Browsers also throttle navigations and may throw this error, generate a warning, or ignore the call if it's called too frequently.
- `SyntaxError` `DOMException`
    Thrown if the provided `url` parameter is not a valid URL.

### Return value

None (`undefined`).

## Examples

```js
// Navigate to the Location.reload article
window.location.assign(
  "https://developer.mozilla.org/en-US/docs/Web/API/Location/reload",
);

// Then navigate to its Specifications section
window.location.assign("#specifications");

// Eventually navigate to https://developer.mozilla.org/en-US/docs/Web
window.location.assign("/Web");
```

## See also

- The `Location` interface it belongs to.
- Similar methods: `Location.replace()` and
  `Location.reload()`.
