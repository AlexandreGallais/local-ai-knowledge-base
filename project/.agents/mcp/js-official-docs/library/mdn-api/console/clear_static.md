---
title: "console: clear() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/clear_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: clear() static method

The **`console.clear()`** static method clears the console if possible.

A graphical console, like those in web browsers, will remove all previous messages; a console displaying on a terminal, like the one in Node.js, will attempt to clear it using an escape code or system API; otherwise the method will have no effect (and no error).

## Syntax

```js
console.clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## See also

- Microsoft Edge's documentation for `console.clear()`
- Node.js documentation for `console.clear()`
- Google Chrome's documentation for `console.clear()`
