---
title: "IdleDetector: userState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledetector/userstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDetector: userState property

The **`userState`** read-only property of the `IdleDetector` interface returns a string indicating whether the user has interacted with the device since the call to `start()`.

## Value

Either `"active"` or `"idle"` if `IdleDetector.start()` has been called, or `null` otherwise.

## Examples

In the following example, the `change` callback prints the status of `userState` and `screenState` to the console.

```js
idleDetector.addEventListener("change", () => {
  const userState = idleDetector.userState;
  const screenState = idleDetector.screenState;
  console.log(`Idle change: ${userState}, ${screenState}.`);
});
```
