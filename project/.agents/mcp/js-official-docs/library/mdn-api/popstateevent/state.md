---
title: "PopStateEvent: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popstateevent/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PopStateEvent: state property

The **`state`** read-only property of the `PopStateEvent` interface represents the state stored when the event was created.

Practically it is a value provided by the call to `history.pushState()` or `history.replaceState()`

## Value

An object, or `null`.

## Examples

The code below logs the value of `state` when using the
`pushState()` method to push a value to the history.

```js
// Log the state of
addEventListener("popstate", (event) => {
  console.log("State received: ", event.state);
});

// Now push something on the stack
history.pushState({ name: "Example" }, "pushState example", "page1.html");
history.pushState(
  { name: "Another example" },
  "pushState example",
  "page1.html",
);
```

This will log:

```plain
State received: { name: "Example" }
State received: { name: "Another example" }
```

## See also

- `PopStateEvent()` constructor
- `History.state`
