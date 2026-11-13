---
title: "Location: reload() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/reload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: reload() method

The **`reload()`** method of the `Location` interface reloads the current URL, like the Refresh button.

## Syntax

```js
reload()
```

### Parameters

- `forceGet` (non-standard)
    Pass `true` to force a reload bypassing the cache. Defaults to `false`. Only supported in Firefox.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the origin of the script calling the method is not the same origin of the page originally described by the `Location` object, mostly when the script is hosted on a different domain.

## Examples

```js
// reload the current page
window.location.reload();
```

## See also

- The `Location` interface it belongs to.
- Similar methods: `Location.assign()` and
  `Location.replace()`.
