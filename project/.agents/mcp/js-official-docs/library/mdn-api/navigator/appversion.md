---
title: "Navigator: appVersion property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/appversion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: appVersion property

The **`Navigator.appVersion`** read-only property of the `Navigator` interface returns a string representing version information about the browser.

## Value

A string.

## Description

The `appVersion` property returns information indicating the browser version.

Note that the information returned varies significantly by browser. In some browsers, such as Chrome, this is nearly the same as the value returned by `Navigator.userAgent`, with the `Mozilla/` prefix removed. For example:

```plain
5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
```

In other browsers, such as Firefox, this is cut down to a short string that hints at the platform/OS. For example:

```plain
5.0 (Macintosh)
```

Theoretically this information is useful for detecting the browser and serving code to work around browser-specific bugs or lack of feature support. However, this is **unreliable** and **is not recommended** for the reasons given in User-Agent reduction and Browser detection using the user agent.

Feature detection is a much more reliable strategy.

## Examples

```js
console.log(navigator.appVersion);
// On Chrome, logs something like "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36" (reduced UA string)

// On Firefox, logs something like "5.0 (Macintosh)"
```

## See also

- `Navigator.userAgent`
- `User-agent` HTTP header
