---
title: "console: group() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/console/group_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# console: group() static method

The **`console.group()`** static method creates a new inline group in the Web console log, causing any subsequent console messages to be indented by an additional level, until `console.groupEnd()` is called.

## Syntax

```js
console.group()
console.group(label)
```

### Parameters

- `label` (optional)
    Label for the group.

### Return value

None (`undefined`).

## Examples

You can use nested groups to help organize your output by visually associating related messages. To create a new nested block, call `console.group()`. The `console.groupCollapsed()` method is similar, but the new block is collapsed and requires clicking a disclosure button to read it.

To exit the current group, call `console.groupEnd()`. For example, given this code:

```js
console.log("This is the outer level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the outer level");
```

The output looks like this:

See Using groups in the console in the documentation of `console` for more details.

## See also

- `console.groupEnd()`
- `console.groupCollapsed()`
- Microsoft Edge's documentation for `console.group()`
- Node.js documentation for `console.group()`
- Google Chrome's documentation for `console.group()`
