---
title: "IdleDetector: screenState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledetector/screenstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDetector: screenState property

The **`screenState`** read-only property of the `IdleDetector` interface
returns a string indicating whether the screen is locked, one of `"locked"` or
`"unlocked"`.

## Value

Either `"locked"` or `"unlocked"` if `IdleDetector.start()` has been called, or `null` otherwise.

## Examples

In the following example, the `change` callback prints the status of `userState` and `screenState` to the console.

```js
idleDetector.addEventListener("change", () => {
  const userState = idleDetector.userState;
  const screenState = idleDetector.screenState;
  console.log(`Idle change: ${userState}, ${screenState}.`);
});
```
