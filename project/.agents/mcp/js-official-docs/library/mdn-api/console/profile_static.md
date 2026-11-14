---
title: "console: profile() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/profile_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: profile() static method

The **`console.profile()`** static method starts recording a performance profile (for example, the Firefox performance tool).

You can optionally supply an argument to name the profile and this then enables you to stop only that profile if multiple profiles being recorded. See `console.profileEnd()` to see how this argument is interpreted.

To stop recording call `console.profileEnd()`.

## Syntax

```js
console.profile(profileName)
```

### Parameters

- `profileName` (optional)
    The name to give the profile.

### Return value

None (`undefined`).

## See also

- `console.profileEnd()`
