---
title: "console: profileEnd() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/profileend_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: profileEnd() static method

The **`console.profileEnd()`** static method stops recording a profile previously started with `console.profile()`.

You can optionally supply an argument to name the profile. Doing so enables you to stop only that profile if you have multiple profiles being recorded.

- If `console.profileEnd()` is passed a profile name, and it matches the name of a profile being recorded, then that profile is stopped.
- If `console.profileEnd()` is passed a profile name and it does not match the name of a profile being recorded, no changes will be made.
- If `console.profileEnd()` is not passed a profile name, the most recently started profile is stopped.

## Syntax

```js
console.profileEnd(profileName)
```

### Parameters

- `profileName` (optional)
    The name to give the profile.

### Return value

None (`undefined`).

## See also

- `console.profile()`
