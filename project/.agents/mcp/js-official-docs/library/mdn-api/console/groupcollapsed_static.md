---
title: "console: groupCollapsed() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/groupcollapsed_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: groupCollapsed() static method

The **`console.groupCollapsed()`** static method creates a new inline group in the console. Unlike `console.group()`, however, the new group is created collapsed. The user will need to use the disclosure button next to it to expand it, revealing the entries created in the group.

Call `console.groupEnd()` to back out to the parent group.

See Using groups in the console in the `console` documentation for details and examples.

## Syntax

```js
console.groupCollapsed()
console.groupCollapsed(label)
```

### Parameters

- `label` (optional)
    Label for the group.

### Return value

None (`undefined`).

## See also

- `console.group()`
- `console.groupEnd()`
- Microsoft Edge's documentation for `console.groupCollapsed()`
- Node.js documentation for `console.groupCollapsed()`
- Google Chrome's documentation for `console.groupCollapsed()`
