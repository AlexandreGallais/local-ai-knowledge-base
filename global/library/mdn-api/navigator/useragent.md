---
title: "Navigator: userAgent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/useragent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: userAgent property

The **`Navigator.userAgent`** read-only property of the `Navigator` interface returns the `User-Agent` (UA) string for the current browser.

## Value

A string.

## Description

The `userAgent` property provides the current browser's UA string. The UA string is built on a formal structure, which can be decomposed into several pieces of information.

The browser also provides the UA string via the `User-Agent` HTTP header. Parts of this information are also available in HTTP headers such as User-Agent client hints and other related API features such as `Navigator.appVersion` and `Navigator.platform`.

Theoretically this information is useful for detecting the browser and serving code to work around browser-specific bugs or lack of feature support. However, this is **unreliable** and **is not recommended** for the reasons given in User-Agent reduction and Browser detection using the user agent.

Feature detection is a much more reliable strategy.

## Examples

```js
console.log(navigator.userAgent);
// On Chrome on macOS, logs something like "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36" (reduced UA string)

// On Firefox on Windows, logs something like "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0"
```

## See also

- `User-Agent` HTTP header
