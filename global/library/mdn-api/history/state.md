---
title: "History: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/history/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# History: state property

The **`state`** read-only property of the `History` interface
returns a value representing the state at the top of the history stack. This is
a way to look at the state without having to wait for a `popstate` event.

## Value

The state at the top of the history stack. The value is `null` until the
`pushState()` or
`replaceState()` method is used.

## Examples

The code below logs the value of `history.state` before using the
`pushState()` method to push a value to the history.
The next line logs the value to the console again, showing that
`history.state` now has a value.

```js
// Should be null because we haven't modified the history stack yet
console.log("History.state before pushState: ", history.state);

// Now push something on the stack
history.pushState({ name: "Example" }, "pushState example", "page3.html");

// Now state has a value.
console.log("History.state after pushState: ", history.state);
```

## See also

- Working with the History API
- `History.pushState()`
- `History.replaceState()`
- `PopStateEvent.state`
