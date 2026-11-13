---
title: "debugger"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/debugger/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# debugger

The **`debugger`** statement invokes any available debugging
functionality, such as setting a breakpoint. If no debugging functionality is available,
this statement has no effect.

## Syntax

```js
debugger;
```

## Examples

### Using the debugger statement

The following example shows code where a `debugger` statement has been
inserted, to invoke a debugger (if one exists) when the function is called.

```js
function potentiallyBuggyCode() {
  debugger;
  // do potentially buggy stuff to examine, step through, etc.
}
```

When the debugger is invoked, execution is paused at the `debugger`
statement. It is like a breakpoint in the script source.

## See also

- The Firefox JavaScript Debugger¶ in the Firefox source docs
