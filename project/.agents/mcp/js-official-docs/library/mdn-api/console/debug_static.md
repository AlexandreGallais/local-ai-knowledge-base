---
title: "console: debug() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/debug_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: debug() static method

The **`console.debug()`** static method outputs a message to the console at the "debug" log level. The message is only displayed to the user if the console is configured to display debug output. In most cases, the log level is configured within the console UI. This log level might correspond to the `Debug` or `Verbose` log level.

## Syntax

```js
console.debug(val1)
console.debug(val1, /* …, */ valN)
console.debug(msg)
console.debug(msg, subst1, /* …, */ substN)
```

### Parameters

- `val1` … `valN`
    A list of JavaScript values to output. A representation of each of these values is output to the console in the order given with some type of separation between each of them. There is a special case if `val1` is a string, which is described subsequently.
- `msg`
    A JavaScript string containing zero or more substitution strings, which are replaced with `subst1` through `substN` in consecutive order up to the number of substitution strings. See Using string substitutions for a description of how substitutions work.
- `subst1` … `substN`
    JavaScript values with which to replace substitution strings within `msg`. If there are more substitution values than there are substitution strings, the extra values are themselves written to the console after the detailed assertion message in the same manner as when there's no format string.

See Outputting text to the console in the documentation of `console` for further details.

### Return value

None (`undefined`).

## See also

- Microsoft Edge's documentation for `console.debug()`
- Node.js documentation for `console.debug()`
- Google Chrome's documentation for `console.debug()`
