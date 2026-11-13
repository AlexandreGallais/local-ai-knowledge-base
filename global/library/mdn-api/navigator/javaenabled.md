---
title: "Navigator: javaEnabled() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/javaenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: javaEnabled() method

This method always returns false.

## Syntax

```js
javaEnabled()
```

### Parameters

None.

### Return value

The boolean value `false`.

## Examples

```js
if (window.navigator.javaEnabled()) {
  // code will never be executed; the condition is always false
}
```
